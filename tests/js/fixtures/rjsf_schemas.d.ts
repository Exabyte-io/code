export namespace EXAMPLE_SCHEMA {
    const type: string;
    namespace properties {
        export namespace type_1 {
            const type_2: string;
            export { type_2 as type };
        }
        export { type_1 as type };
        export namespace subtype {
            const type_3: string;
            export { type_3 as type };
        }
        export namespace subsubtype {
            const type_4: string;
            export { type_4 as type };
        }
    }
}
export namespace TREE_SIMPLE {
    const path: string;
    namespace data {
        const key: string;
        const value: string;
        const name: string;
    }
    const children: {
        path: string;
        data: {
            key: string;
            value: string;
            name: string;
        };
        children: {
            path: string;
            data: {
                key: string;
                value: string;
                name: string;
            };
        }[];
    }[];
}
export namespace TREE_ADVANCED {
    const path_1: string;
    export { path_1 as path };
    export namespace data_1 {
        const key_1: string;
        export { key_1 as key };
        const value_1: string;
        export { value_1 as value };
        const name_1: string;
        export { name_1 as name };
    }
    export { data_1 as data };
    const children_1: (
        | {
              path: string;
              data: {
                  key: string;
                  value: string;
                  name: string;
              };
              children: {
                  path: string;
                  data: {
                      key: string;
                      value: string;
                      name: string;
                  };
              }[];
              staticOptions?: undefined;
          }
        | {
              path: string;
              data: {
                  key: string;
                  value: string;
                  name: string;
              };
              children: {
                  path: string;
                  data: {
                      key: string;
                      value: string;
                      name: string;
                  };
              }[];
              staticOptions: {
                  key: string;
                  values: string[];
              }[];
          }
    )[];
    export { children_1 as children };
    export const staticOptions: (
        | {
              key: string;
              values: string[];
              namesMap: {
                  static_a1: string;
              };
          }
        | {
              key: string;
              values: boolean[];
              namesMap?: undefined;
          }
    )[];
}
export namespace UNEVEN_TREE {
    const path_2: string;
    export { path_2 as path };
    export namespace data_2 {
        const key_2: string;
        export { key_2 as key };
        const value_2: string;
        export { value_2 as value };
        const name_2: string;
        export { name_2 as name };
    }
    export { data_2 as data };
    const children_2: (
        | {
              path: string;
              data: {
                  key: string;
                  value: string;
                  name: string;
              };
              children?: undefined;
          }
        | {
              path: string;
              data: {
                  key: string;
                  value: string;
                  name: string;
              };
              children: {
                  path: string;
                  data: {
                      key: string;
                      value: string;
                      name: string;
                  };
              }[];
          }
        | {
              path: string;
              data: {
                  key: string;
                  value: string;
                  name: string;
              };
              children: {
                  path: string;
                  data: {
                      key: string;
                      value: string;
                      name: string;
                  };
                  children: {
                      path: string;
                      data: {
                          key: string;
                          value: string;
                          name: string;
                      };
                  }[];
              }[];
          }
    )[];
    export { children_2 as children };
}
export namespace TREE_STATIC_TERMINAL {
    const path_3: string;
    export { path_3 as path };
    export namespace data_3 {
        const key_3: string;
        export { key_3 as key };
        const value_3: string;
        export { value_3 as value };
        const name_3: string;
        export { name_3 as name };
    }
    export { data_3 as data };
    const children_3: (
        | {
              path: string;
              data: {
                  key: string;
                  value: string;
                  name: string;
              };
              children?: undefined;
          }
        | {
              path: string;
              data: {
                  key: string;
                  value: string;
                  name: string;
              };
              children: (
                  | {
                        path: string;
                        data: {
                            key: string;
                            value: string;
                            name: string;
                        };
                        staticOptions: {
                            key: string;
                            values: string[];
                        }[];
                    }
                  | {
                        path: string;
                        data: {
                            key: string;
                            value: string;
                            name: string;
                        };
                        staticOptions?: undefined;
                    }
              )[];
          }
    )[];
    export { children_3 as children };
}
