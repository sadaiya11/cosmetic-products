const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["cart.js","preload-helper.js","string.js","sellingPlan.js","index.js","index4.js","env.js","cart2.js","index5.js","index3.js","index2.css","index.css"])))=>i.map(i=>d[i]);
function __vite_legacy_guard() {
  import.meta.url;
  import("_").catch(() => 1);
  (async function* () {
  })().next();
}
;
import { _ as __vitePreload } from "./preload-helper.js";
if (window.Shopline.uri.alias === "Cart") {
  __vitePreload(() => import("./cart.js"), true ? __vite__mapDeps([0,1,2,3]) : void 0);
} else if (window.Shopline.themeTypeVersion === 3) {
  __vitePreload(async () => {
    const { getCartUpgradeConfig } = await import("./sellingPlan.js");
    return { getCartUpgradeConfig };
  }, true ? [] : void 0).then(({ getCartUpgradeConfig }) => {
    const upgradeConfig = getCartUpgradeConfig();
    if (upgradeConfig == null ? void 0 : upgradeConfig.isEnable) {
      __vitePreload(() => import("./index.js"), true ? __vite__mapDeps([4,5,6,7,3,8,9,10,11]) : void 0).then((mod) => {
        mod.initCartSubscription();
      });
    }
  });
}
export {
  __vite_legacy_guard
};
