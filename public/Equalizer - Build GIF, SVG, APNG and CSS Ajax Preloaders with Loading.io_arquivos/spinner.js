// Generated by LiveScript 1.3.0
(function(){
  ldc.register('spinner', ['auth', 'ldcvmgr', 'assetmgr', 'viewLocals', 'editor', 'payItem,', 'notify'], function(arg$){
    var auth, ldcvmgr, assetmgr, viewLocals, editor, payItem, notify, local, lded, renderer, loadMod, asset, hintBtn, view;
    auth = arg$.auth, ldcvmgr = arg$.ldcvmgr, assetmgr = arg$.assetmgr, viewLocals = arg$.viewLocals, editor = arg$.editor, payItem = arg$.payItem, notify = arg$.notify;
    local = {};
    /*update-account-info = debounce 1000 (v) -> auth.get!then (g) ->
      is-pro = g.{}user.plan
      if !(account-info = ld$.find(document,'#editor .account-info',0)) => return
      account-info.classList[if v => \add else \remove] \granted
      ld$.find(account-info, '.grant-info .btn', 0).innerText = (
        if is-pro => "PRO ACCOUNT" else if v => "2 DAYS PASS" else ''
      )
      account-info.classList.remove \d-none
    */
    local.lded = lded = new ldEditor({
      root: '.lded',
      view: '.lded .viewer',
      renderer: renderer,
      palconfig: editor.palconfig,
      modalconfig: editor.modalconfig,
      ui: {
        pos: 'top',
        size: 'sm',
        'class': "lded-sparse compact",
        tab: {
          'class': 'nav-pills'
        }
      },
      action: {
        metainfo: function(){
          return "generated by https://loading.io/";
        },
        download: function(arg$){
          var act, lded, lic, type, item;
          act = arg$.act, lded = arg$.lded;
          lic = (local.mod.license || 'pro').toLowerCase();
          type = lic === 'free'
            ? 'free'
            : lic === 'by' ? 'attribute' : 'pay';
          item = {
            type: 'spinner',
            id: local.mod.id,
            name: local.mod.name
          };
          return editor.action.download({
            act: act,
            item: item,
            type: type,
            lded: lded
          });
        },
        gopro: function(){
          return editor.action.gopro();
        },
        patchEdit: function(edit){
          var k, v, results$ = [];
          for (k in edit) {
            v = edit[k];
            if (!v.priority) {
              results$.push(v.priority = 1.5);
            }
          }
          return results$;
        },
        setPro: function(v){
          return editor.setPro(v, {
            lded: local.lded,
            showTaglet: false
          });
        },
        save: function(params){
          return editor.action.save({
            lded: lded,
            params: params,
            key: local.key,
            name: local.mod.name,
            type: 'spinner',
            payload: {
              id: local.mod.id,
              config: params.config
            }
          }).then(function(it){
            var that;
            it == null && (it = {});
            if (that = it.key) {
              return local.key = that;
            }
          });
        }
      }
    });
    lded.renderer = renderer = new ModRenderer('.lded .viewer', {
      choosefont: lded.choosefont
    });
    ldc.on('auth.change', function(arg$){
      var user;
      user = arg$.user;
      return auth.userinfo(user).then(function(info){
        return lded.setPro(info.isPro);
      });
    });
    loadMod = function(name, config, opts){
      opts == null && (opts = {});
      if (!opts.noScroll) {
        scrollto('#editor', 500, -100);
      }
      return ModManager.load('spinner', name)['catch'](function(){
        return ldcvmgr.get("mod-load-failed");
      }).then(function(it){
        return renderer.initMod(local.mod = it);
      }).then(function(){
        return lded.setMod(local.mod, config);
      }).then(function(){
        var lic, more;
        lic = (local.mod.license || 'pro').toLowerCase();
        more = lic === 'pro' ? "($1.99)" : '';
        return hintBtn.innerHTML = "Download with<br>\n<a href=\"/license/#" + lic.toLowerCase() + "-license\" target=\"_blank\">\n  <b class=\"text-capitalize\">" + lic + " License" + more + "</b>\n</a>";
      }).then(function(){
        return editor.grantType({
          id: name,
          type: 'spinner'
        }, false);
      }).then(function(it){
        return lded.setPro(!!it);
      });
    };
    ldc.action({
      load: function(name){
        return loadMod(name);
      }
    });
    if (!viewLocals) {
      viewLocals = {};
    }
    if (viewLocals.asset) {
      local.asset = asset = viewLocals.asset;
      local.key = asset.key;
      loadMod(asset.payload.id, asset.payload.config);
    } else if (viewLocals.mod) {
      loadMod(viewLocals.mod.id);
    } else {
      loadMod('spinner', null, {
        noScroll: true
      });
    }
    hintBtn = ld$.find(lded.root, '.ctrl .btn', 0);
    hintBtn.classList.add('hint');
    return view = new ldView({
      root: document,
      handler: {
        "landing-search-icon": function(arg$){
          var node, input, btn, go;
          node = arg$.node;
          input = ld$.find(node, 'input', 0);
          btn = ld$.find(node, '.btn', 0);
          go = function(){
            return window.location.href = "/icon/?keyword=" + encodeURIComponent(input.value);
          };
          btn.addEventListener('click', function(){
            return go();
          });
          return input.addEventListener('keyup', function(e){
            if (e.keyCode === 13) {
              return go();
            }
          });
        }
      }
    });
  });
  return ldc.app('spinner');
})();