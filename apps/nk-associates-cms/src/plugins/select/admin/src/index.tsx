import { prefixPluginTranslations } from "@strapi/helper-plugin";

import pluginPkg from "../../package.json";
import getTrad from "./utils/getTrad";
import pluginId from "./pluginId";
import Initializer from "./components/Initializer";
import PluginIcon from "./components/PluginIcon";

const name = pluginPkg.strapi.name;

const selectConfig = {
  register(app: any) {
    app.customFields.register({
      name: "select",
      pluginId: "select",
      type: "json",
      inputSize: 12,
      intlLabel: {
        id: getTrad("select.label"),
        defaultMessage: "Select",
      },
      intlDescription: {
        id: getTrad("select.description"),
        defaultMessage: "Select relational options from a list",
      },
      icon: PluginIcon,
      components: {
        Input: async () => import("./components/Select"),
      },
      options: {
        base: [
          {
            sectionTitle: null,
            items: [
              {
                intlLabel: { id: "FIXME", defaultMessage: "FIXME" },
                name: "options-relation",
                size: 12,
                type: "relation",
              },
            ],
          },
        ],
        advanced: [
          {
            sectionTitle: {
              id: "global.settings",
              defaultMessage: "Settings",
            },
            items: [
              {
                name: "required",
                type: "checkbox",
                intlLabel: {
                  id: "form.attribute.item.requiredField",
                  defaultMessage: "Required field",
                },
                description: {
                  id: "form.attribute.item.requiredField.description",
                  defaultMessage:
                    "You won't be able to create an entry if this field is empty",
                },
              },
              {
                name: "private",
                type: "checkbox",
                intlLabel: {
                  id: "form.attribute.item.private",
                  defaultMessage: "Private field",
                },
                description: {
                  id: "form.attribute.item.private.description",
                  defaultMessage:
                    "This field will not show up in the API response",
                },
              },
            ],
          },
          {
            sectionTitle: null,
            items: [
              {
                autoFocus: true,
                type: "select-default-boolean",
                intlLabel: {
                  id: getTrad("form.attribute.settings.default"),
                  defaultMessage: "Default value",
                },
                name: "default",
                options: [
                  {
                    value: "true",
                    key: "true",
                    metadatas: {
                      intlLabel: { id: "true", defaultMessage: "true" },
                    },
                  },
                  {
                    value: "",
                    key: "null",
                    metadatas: {
                      intlLabel: { id: "null", defaultMessage: "null" },
                    },
                  },
                  {
                    value: "false",
                    key: "false",
                    metadatas: {
                      intlLabel: { id: "false", defaultMessage: "false" },
                    },
                  },
                ],
                // validations: {},
              },
            ],
          },
        ],
      },
    });

    // app.addMenuLink({
    //   to: `/plugins/${pluginId}`,
    //   icon: PluginIcon,
    //   intlLabel: {
    //     id: `${pluginId}.plugin.name`,
    //     defaultMessage: name,
    //   },
    //   Component: async () => {
    //     const component = await import(
    //       /* webpackChunkName: "[request]" */ "./components/Select"
    //     );

    //     return component;
    //   },
    //   permissions: [
    //     // Uncomment to set the permissions of the plugin here
    //     // {
    //     //   action: '', // the action name should be plugin::plugin-name.actionType
    //     //   subject: null,
    //     // },
    //   ],
    // });

    const plugin = {
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    };

    app.registerPlugin(plugin);
  },

  bootstrap(app: any) {},

  async registerTrads(app: any) {
    const { locales } = app;

    const importedTrads = await Promise.all(
      (locales as any[]).map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      }),
    );

    return Promise.resolve(importedTrads);
  },
};

export default selectConfig;
