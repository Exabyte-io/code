import pytest
from mat3ra.utils import assertion
from . import AutoSnakeCaseTestEntity

BASE = {
    "applicationName": "camelCasedValue",
    "applicationVersion": "camelCasedVersion",
    "executableName": "camelCasedExecutable",
    "contextProviders": [],
}

INSTANTIATION = [
    {"application_name": BASE["applicationName"], "application_version": BASE["applicationVersion"],
     "executable_name": BASE["executableName"]},
    {"applicationName": BASE["applicationName"], "applicationVersion": BASE["applicationVersion"],
     "executableName": BASE["executableName"]},
    {"application_name": BASE["applicationName"], "applicationVersion": BASE["applicationVersion"],
     "executable_name": BASE["executableName"]},
]

UPDATES = [
    (
        {"application_name": "new_value", "context_providers": ["item_snake"]},
        {"applicationName": "new_value", "contextProviders": ["item_snake"]},
        {"application_name": "new_value", "context_providers": ["item_snake"]},
    ),
    (
        {"applicationName": "newValueCamel", "contextProviders": ["itemCamel"]},
        {"applicationName": "newValueCamel", "contextProviders": ["itemCamel"]},
        {"application_name": "newValueCamel", "context_providers": ["itemCamel"]},
    ),
    (
        {"application_name": "new_value_snake", "applicationVersion": "newVersionCamel"},
        {"applicationName": "new_value_snake", "applicationVersion": "newVersionCamel"},
        {"application_name": "new_value_snake", "application_version": "newVersionCamel"},
    ),
    (
        {"application_name": "new_val", "application_version": "new_version",
         "executable_name": "new_exec", "context_providers": ["a", "b"]},
        {"applicationName": "new_val", "applicationVersion": "new_version",
         "executableName": "new_exec", "contextProviders": ["a", "b"]},
        {"application_name": "new_val", "application_version": "new_version",
         "executable_name": "new_exec", "context_providers": ["a", "b"]},
    ),
]


def camel(entity):
    return dict(
        applicationName=entity.applicationName,
        applicationVersion=entity.applicationVersion,
        executableName=entity.executableName,
        contextProviders=entity.contextProviders,
    )


def snake(entity):
    return dict(
        application_name=entity.application_name,
        application_version=entity.application_version,
        executable_name=entity.executable_name,
        context_providers=entity.context_providers,
    )


@pytest.mark.parametrize("cfg", INSTANTIATION)
def test_instantiation(cfg):
    entity = AutoSnakeCaseTestEntity(**cfg)
    assertion.assert_deep_almost_equal(BASE, camel(entity))
    assertion.assert_deep_almost_equal(
        dict(application_name=BASE["applicationName"],
             application_version=BASE["applicationVersion"],
             executable_name=BASE["executableName"],
             context_providers=[]),
        snake(entity),
    )


@pytest.mark.parametrize("updates, exp_camel, exp_snake", UPDATES)
def test_updates(updates, exp_camel, exp_snake):
    entity = AutoSnakeCaseTestEntity(**BASE)
    for k, v in updates.items():
        setattr(entity, k, v)
    assertion.assert_deep_almost_equal({**BASE, **exp_camel}, camel(entity))
    assertion.assert_deep_almost_equal(
        {**snake(AutoSnakeCaseTestEntity(**BASE)), **exp_snake},
        snake(entity),
    )
    out = entity.to_dict()
    assertion.assert_deep_almost_equal({**BASE, **exp_camel}, out)
    assert "application_name" not in out and "context_providers" not in out
