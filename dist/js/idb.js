"use strict";!function(){function e(e){return new Promise(function(t,n){e.onsuccess=function(){t(e.result)},e.onerror=function(){n(e.error)}})}function t(t,n,o){var r,i=new Promise(function(i,u){e(r=t[n].apply(t,o)).then(i,u)});return i.request=r,i}function n(e,t,n){n.forEach(function(n){Object.defineProperty(e.prototype,n,{get:function(){return this[t][n]},set:function(e){this[t][n]=e}})})}function o(e,n,o,r){r.forEach(function(r){r in o.prototype&&(e.prototype[r]=function(){return t(this[n],r,arguments)})})}function r(e,t,n,o){o.forEach(function(o){o in n.prototype&&(e.prototype[o]=function(){return this[t][o].apply(this[t],arguments)})})}function i(e,n,o,r){r.forEach(function(r){r in o.prototype&&(e.prototype[r]=function(){return e=this[n],(o=t(e,r,arguments)).then(function(e){if(e)return new c(e,o.request)});var e,o})})}function u(e){this._index=e}function c(e,t){this._cursor=e,this._request=t}function s(e){this._store=e}function p(e){this._tx=e,this.complete=new Promise(function(t,n){e.oncomplete=function(){t()},e.onerror=function(){n(e.error)},e.onabort=function(){n(e.error)}})}function a(e,t,n){this._db=e,this.oldVersion=t,this.transaction=new p(n)}function f(e){this._db=e}n(u,"_index",["name","keyPath","multiEntry","unique"]),o(u,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]),i(u,"_index",IDBIndex,["openCursor","openKeyCursor"]),n(c,"_cursor",["direction","key","primaryKey","value"]),o(c,"_cursor",IDBCursor,["update","delete"]),["advance","continue","continuePrimaryKey"].forEach(function(t){t in IDBCursor.prototype&&(c.prototype[t]=function(){var n=this,o=arguments;return Promise.resolve().then(function(){return n._cursor[t].apply(n._cursor,o),e(n._request).then(function(e){if(e)return new c(e,n._request)})})})}),s.prototype.createIndex=function(){return new u(this._store.createIndex.apply(this._store,arguments))},s.prototype.index=function(){return new u(this._store.index.apply(this._store,arguments))},n(s,"_store",["name","keyPath","indexNames","autoIncrement"]),o(s,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]),i(s,"_store",IDBObjectStore,["openCursor","openKeyCursor"]),r(s,"_store",IDBObjectStore,["deleteIndex"]),p.prototype.objectStore=function(){return new s(this._tx.objectStore.apply(this._tx,arguments))},n(p,"_tx",["objectStoreNames","mode"]),r(p,"_tx",IDBTransaction,["abort"]),a.prototype.createObjectStore=function(){return new s(this._db.createObjectStore.apply(this._db,arguments))},n(a,"_db",["name","version","objectStoreNames"]),r(a,"_db",IDBDatabase,["deleteObjectStore","close"]),f.prototype.transaction=function(){return new p(this._db.transaction.apply(this._db,arguments))},n(f,"_db",["name","version","objectStoreNames"]),r(f,"_db",IDBDatabase,["close"]),["openCursor","openKeyCursor"].forEach(function(e){[s,u].forEach(function(t){e in t.prototype&&(t.prototype[e.replace("open","iterate")]=function(){var t,n=(t=arguments,Array.prototype.slice.call(t)),o=n[n.length-1],r=this._store||this._index,i=r[e].apply(r,n.slice(0,-1));i.onsuccess=function(){o(i.result)}})})}),[u,s].forEach(function(e){e.prototype.getAll||(e.prototype.getAll=function(e,t){var n=this,o=[];return new Promise(function(r){n.iterateCursor(e,function(e){e?(o.push(e.value),void 0===t||o.length!=t?e.continue():r(o)):r(o)})})})});var d={open:function(e,n,o){var r=t(indexedDB,"open",[e,n]),i=r.request;return i&&(i.onupgradeneeded=function(e){o&&o(new a(i.result,e.oldVersion,i.transaction))}),r.then(function(e){return new f(e)})},delete:function(e){return t(indexedDB,"deleteDatabase",[e])}};"undefined"!=typeof module?(module.exports=d,module.exports.default=module.exports):self.idb=d}();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkYi5qcyJdLCJuYW1lcyI6WyJwcm9taXNpZnlSZXF1ZXN0IiwicmVxdWVzdCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwib25zdWNjZXNzIiwicmVzdWx0Iiwib25lcnJvciIsImVycm9yIiwicHJvbWlzaWZ5UmVxdWVzdENhbGwiLCJvYmoiLCJtZXRob2QiLCJhcmdzIiwicCIsImFwcGx5IiwidGhlbiIsInByb3BlcnRpZXMiLCJQcm94eUNsYXNzIiwidGFyZ2V0UHJvcCIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZ2V0IiwicHJvdG90eXBlIiwicHJvcCIsInRoaXMiLCJzZXQiLCJ2YWwiLCJDb25zdHJ1Y3RvciIsImFyZ3VtZW50cyIsInByb3h5TWV0aG9kcyIsImZvckVhY2giLCJwcm94eUN1cnNvclJlcXVlc3RNZXRob2RzIiwidmFsdWUiLCJDdXJzb3IiLCJJbmRleCIsImluZGV4IiwiX2luZGV4IiwiY3Vyc29yIiwiX2N1cnNvciIsIl9yZXF1ZXN0IiwiT2JqZWN0U3RvcmUiLCJzdG9yZSIsIl9zdG9yZSIsInByb3h5UHJvcGVydGllcyIsImlkYlRyYW5zYWN0aW9uIiwiREIiLCJjb21wbGV0ZSIsIm9uY29tcGxldGUiLCJmdW5jTmFtZSIsIlVwZ3JhZGVEQiIsIm9sZFZlcnNpb24iLCJpbnN0YW5jZSIsIml0ZW1zIiwiVHJhbnNhY3Rpb24iLCJ0cmFuc2FjdGlvbiIsIl9kYiIsInByb3h5UmVxdWVzdE1ldGhvZHMiLCJJREJJbmRleCIsIklEQkN1cnNvciIsIm1ldGhvZE5hbWUiLCJJREJPYmplY3RTdG9yZSIsImNyZWF0ZUluZGV4Iiwib2JqZWN0U3RvcmUiLCJkYiIsImNhbGxiYWNrIiwiX3R4IiwiSURCVHJhbnNhY3Rpb24iLCJjcmVhdGVPYmplY3RTdG9yZSIsIklEQkRhdGFiYXNlIiwib251cGdyYWRlbmVlZGVkIiwidXBncmFkZUNhbGxiYWNrIiwiZGVsZXRlIiwibW9kdWxlIiwicmVwbGFjZSIsImFyciIsIkFycmF5Iiwic2xpY2UiLCJjYWxsIiwibGVuZ3RoIiwibmF0aXZlT2JqZWN0IiwiZ2V0QWxsIiwicXVlcnkiLCJjb3VudCIsIml0ZXJhdGVDdXJzb3IiLCJwdXNoIiwidW5kZWZpbmVkIiwiY29udGludWUiLCJleHAiLCJvcGVuIiwibmFtZSIsInZlcnNpb24iLCJpbmRleGVkREIiLCJldmVudCIsImV4cG9ydHMiLCJkZWZhdWx0Iiwic2VsZiIsImlkYiJdLCJtYXBwaW5ncyI6IkFBZUEsY0FFQyxXQUtDLFNBQVNBLEVBQWlCQyxHQUN4QixPQUFPLElBQUlDLFFBQVEsU0FBQUMsRUFBQUMsR0FDakJILEVBQVFJLFVBQVksV0FDbEJGLEVBQVFGLEVBQVFLLFNBR2xCTCxFQUFRTSxRQUFVLFdBQ2hCSCxFQUFPSCxFQUFRTyxVQUtyQixTQUFTQyxFQUFxQkMsRUFBS0MsRUFBUUMsR0FDekMsSUFBSVgsRUFDQVksRUFBSSxJQUFJWCxRQUFRLFNBQUFDLEVBQUFDLEdBRWxCSixFQURBQyxFQUFVUyxFQUFJQyxHQUFRRyxNQUFNSixFQUFLRSxJQUNQRyxLQUFLWixFQUFTQyxLQUszQyxPQURDUyxFQUFBWixRQUFBQSxFQUNEWSxFQVdDRyxTQUFBQSxFQUFtQkMsRUFBZUMsRUFBQUYsR0FDaENHLEVBQU9DLFFBQUFBLFNBQWVILEdBQ3BCSSxPQUFLRCxlQUFXSCxFQUFBSyxVQUFBQyxFQUFBLENBQ2RGLElBQUEsV0FGOEMsT0FBQUcsS0FBQU4sR0FBQUssSUFLOUNFLElBQUEsU0FBS1AsR0FDTk0sS0FBQU4sR0FBQUssR0FBQUcsT0FNTFYsU0FBQUEsRUFBbUJDLEVBQWVDLEVBQUFTLEVBQUFYLEdBQ2hDQSxFQUFNTyxRQUFRSSxTQUFZTCxHQUFwQkMsS0FBUUksRUFBWUwsWUFDMUJMLEVBQVdLLFVBQVVDLEdBQVEsV0FDM0IsT0FBT2QsRUFBcUJlLEtBQUtOLEdBQWFLLEVBQU1LLGVBSzFELFNBQVNDLEVBQWFaLEVBQVlDLEVBQVlTLEVBQWFYLEdBQ3pEQSxFQUFXYyxRQUFRLFNBQUFQLEdBQ1hBLEtBQVFJLEVBQVlM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QUFZTCxVQUFVMEQsT0FBUyxTQUFTQyxFQUFPQyxHQUM3QyxJQUFJL0IsRUFBVzNCLEtBQ1g0QixFQUFRLEdBRVosT0FBTyxJQUFJbEQsUUFBUSxTQUFTQyxHQUMxQmdELEVBQVNnQyxjQUFjRixFQUFPLFNBQVM1QyxHQUNoQ0EsR0FJTGUsRUFBTWdDLEtBQUsvQyxFQUFPTCxZQUVKcUQsSUFBVkgsR0FBdUI5QixFQUFNMEIsUUFBVUksRUFJM0M3QyxFQUFPaUQsV0FITG5GLEVBQVFpRCxJQU5SakQsRUFBUWlELFdBZWxCLElBQUltQyxFQUFNLENBQ1JDLEtBQU0sU0FBU0MsRUFBTUMsRUFBU3BCLEdBQzVCLElBQUl6RCxFQUFJSixFQUFxQmtGLFVBQVcsT0FBUSxDQUFDRixFQUFNQyxJQUNuRHpGLEVBQVVZLEVBQUVaLFFBVWhCLE9BUklBLElBQ0ZBLEVBQVFvRSxnQkFBa0IsU0FBU3VCLEdBQzdCdEIsR0FDRkEsRUFBZ0IsSUFBSXJCLEVBQVVoRCxFQUFRSyxPQUFRc0YsRUFBTTFDLFdBQVlqRCxFQUFRcUQsZ0JBS3ZFekMsRUFBRUUsS0FBSyxTQUFTZ0QsR0FDckIsT0FBTyxJQUFJbEIsRUFBR2tCLE1BR2xCUSxPQUFRLFNBQVNrQixHQUNmLE9BQU9oRixFQUFxQmtGLFVBQVcsaUJBQWtCLENBQUNGLE1BSXhDLG9CQUFYakIsUUFDVEEsT0FBT3FCLFFBQVVOLEVBQ2pCZixPQUFPcUIsUUFBUUMsUUFBVXRCLE9BQU9xQixTQUdoQ0UsS0FBS0MsSUFBTVQsRUF2VGQiLCJmaWxlIjoiaWRiLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy5cclxuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcblxyXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiovXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbihmdW5jdGlvbigpIHtcclxuICBmdW5jdGlvbiB0b0FycmF5KGFycikge1xyXG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFycik7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBwcm9taXNpZnlSZXF1ZXN0KHJlcXVlc3QpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXNvbHZlKHJlcXVlc3QucmVzdWx0KTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJlamVjdChyZXF1ZXN0LmVycm9yKTtcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcHJvbWlzaWZ5UmVxdWVzdENhbGwob2JqLCBtZXRob2QsIGFyZ3MpIHtcclxuICAgIHZhciByZXF1ZXN0O1xyXG4gICAgdmFyIHAgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgcmVxdWVzdCA9IG9ialttZXRob2RdLmFwcGx5KG9iaiwgYXJncyk7XHJcbiAgICAgIHByb21pc2lmeVJlcXVlc3QocmVxdWVzdCkudGhlbihyZXNvbHZlLCByZWplY3QpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcC5yZXF1ZXN0ID0gcmVxdWVzdDtcclxuICAgIHJldHVybiBwO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcHJvbWlzaWZ5Q3Vyc29yUmVxdWVzdENhbGwob2JqLCBtZXRob2QsIGFyZ3MpIHtcclxuICAgIHZhciBwID0gcHJvbWlzaWZ5UmVxdWVzdENhbGwob2JqLCBtZXRob2QsIGFyZ3MpO1xyXG4gICAgcmV0dXJuIHAudGhlbihmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICBpZiAoIXZhbHVlKSByZXR1cm47XHJcbiAgICAgIHJldHVybiBuZXcgQ3Vyc29yKHZhbHVlLCBwLnJlcXVlc3QpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBwcm94eVByb3BlcnRpZXMoUHJveHlDbGFzcywgdGFyZ2V0UHJvcCwgcHJvcGVydGllcykge1xyXG4gICAgcHJvcGVydGllcy5mb3JFYWNoKGZ1bmN0aW9uKHByb3ApIHtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFByb3h5Q2xhc3MucHJvdG90eXBlLCBwcm9wLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzW3RhcmdldFByb3BdW3Byb3BdO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbih2YWwpIHtcclxuICAgICAgICAgIHRoaXNbdGFyZ2V0UHJvcF1bcHJvcF0gPSB2YWw7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcHJveHlSZXF1ZXN0TWV0aG9kcyhQcm94eUNsYXNzLCB0YXJnZXRQcm9wLCBDb25zdHJ1Y3RvciwgcHJvcGVydGllcykge1xyXG4gICAgcHJvcGVydGllcy5mb3JFYWNoKGZ1bmN0aW9uKHByb3ApIHtcclxuICAgICAgaWYgKCEocHJvcCBpbiBDb25zdHJ1Y3Rvci5wcm90b3R5cGUpKSByZXR1cm47XHJcbiAgICAgIFByb3h5Q2xhc3MucHJvdG90eXBlW3Byb3BdID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3RDYWxsKHRoaXNbdGFyZ2V0UHJvcF0sIHByb3AsIGFyZ3VtZW50cyk7XHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHByb3h5TWV0aG9kcyhQcm94eUNsYXNzLCB0YXJnZXRQcm9wLCBDb25zdHJ1Y3RvciwgcHJvcGVydGllcykge1xyXG4gICAgcHJvcGVydGllcy5mb3JFYWNoKGZ1bmN0aW9uKHByb3ApIHtcclxuICAgICAgaWYgKCEocHJvcCBpbiBDb25zdHJ1Y3Rvci5wcm90b3R5cGUpKSByZXR1cm47XHJcbiAgICAgIFByb3h5Q2xhc3MucHJvdG90eXBlW3Byb3BdID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXNbdGFyZ2V0UHJvcF1bcHJvcF0uYXBwbHkodGhpc1t0YXJnZXRQcm9wXSwgYXJndW1lbnRzKTtcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcHJveHlDdXJzb3JSZXF1ZXN0TWV0aG9kcyhQcm94eUNsYXNzLCB0YXJnZXRQcm9wLCBDb25zdHJ1Y3RvciwgcHJvcGVydGllcykge1xyXG4gICAgcHJvcGVydGllcy5mb3JFYWNoKGZ1bmN0aW9uKHByb3ApIHtcclxuICAgICAgaWYgKCEocHJvcCBpbiBDb25zdHJ1Y3Rvci5wcm90b3R5cGUpKSByZXR1cm47XHJcbiAgICAgIFByb3h5Q2xhc3MucHJvdG90eXBlW3Byb3BdID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeUN1cnNvclJlcXVlc3RDYWxsKHRoaXNbdGFyZ2V0UHJvcF0sIHByb3AsIGFyZ3VtZW50cyk7XHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIEluZGV4KGluZGV4KSB7XHJcbiAgICB0aGlzLl9pbmRleCA9IGluZGV4O1xyXG4gIH1cclxuXHJcbiAgcHJveHlQcm9wZXJ0aWVzKEluZGV4LCAnX2luZGV4JywgW1xyXG4gICAgJ25hbWUnLFxyXG4gICAgJ2tleVBhdGgnLFxyXG4gICAgJ211bHRpRW50cnknLFxyXG4gICAgJ3VuaXF1ZSdcclxuICBdKTtcclxuXHJcbiAgcHJveHlSZXF1ZXN0TWV0aG9kcyhJbmRleCwgJ19pbmRleCcsIElEQkluZGV4LCBbXHJcbiAgICAnZ2V0JyxcclxuICAgICdnZXRLZXknLFxyXG4gICAgJ2dldEFsbCcsXHJcbiAgICAnZ2V0QWxsS2V5cycsXHJcbiAgICAnY291bnQnXHJcbiAgXSk7XHJcblxyXG4gIHByb3h5Q3Vyc29yUmVxdWVzdE1ldGhvZHMoSW5kZXgsICdfaW5kZXgnLCBJREJJbmRleCwgW1xyXG4gICAgJ29wZW5DdXJzb3InLFxyXG4gICAgJ29wZW5LZXlDdXJzb3InXHJcbiAgXSk7XHJcblxyXG4gIGZ1bmN0aW9uIEN1cnNvcihjdXJzb3IsIHJlcXVlc3QpIHtcclxuICAgIHRoaXMuX2N1cnNvciA9IGN1cnNvcjtcclxuICAgIHRoaXMuX3JlcXVlc3QgPSByZXF1ZXN0O1xyXG4gIH1cclxuXHJcbiAgcHJveHlQcm9wZXJ0aWVzKEN1cnNvciwgJ19jdXJzb3InLCBbXHJcbiAgICAnZGlyZWN0aW9uJyxcclxuICAgICdrZXknLFxyXG4gICAgJ3ByaW1hcnlLZXknLFxyXG4gICAgJ3ZhbHVlJ1xyXG4gIF0pO1xyXG5cclxuICBwcm94eVJlcXVlc3RNZXRob2RzKEN1cnNvciwgJ19jdXJzb3InLCBJREJDdXJzb3IsIFtcclxuICAgICd1cGRhdGUnLFxyXG4gICAgJ2RlbGV0ZSdcclxuICBdKTtcclxuXHJcbiAgLy8gcHJveHkgJ25leHQnIG1ldGhvZHNcclxuICBbJ2FkdmFuY2UnLCAnY29udGludWUnLCAnY29udGludWVQcmltYXJ5S2V5J10uZm9yRWFjaChmdW5jdGlvbihtZXRob2ROYW1lKSB7XHJcbiAgICBpZiAoIShtZXRob2ROYW1lIGluIElEQkN1cnNvci5wcm90b3R5cGUpKSByZXR1cm47XHJcbiAgICBDdXJzb3IucHJvdG90eXBlW21ldGhvZE5hbWVdID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBjdXJzb3IgPSB0aGlzO1xyXG4gICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY3Vyc29yLl9jdXJzb3JbbWV0aG9kTmFtZV0uYXBwbHkoY3Vyc29yLl9jdXJzb3IsIGFyZ3MpO1xyXG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KGN1cnNvci5fcmVxdWVzdCkudGhlbihmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgaWYgKCF2YWx1ZSkgcmV0dXJuO1xyXG4gICAgICAgICAgcmV0dXJuIG5ldyBDdXJzb3IodmFsdWUsIGN1cnNvci5fcmVxdWVzdCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuICB9KTtcclxuXHJcbiAgZnVuY3Rpb24gT2JqZWN0U3RvcmUoc3RvcmUpIHtcclxuICAgIHRoaXMuX3N0b3JlID0gc3RvcmU7XHJcbiAgfVxyXG5cclxuICBPYmplY3RTdG9yZS5wcm90b3R5cGUuY3JlYXRlSW5kZXggPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiBuZXcgSW5kZXgodGhpcy5fc3RvcmUuY3JlYXRlSW5kZXguYXBwbHkodGhpcy5fc3RvcmUsIGFyZ3VtZW50cykpO1xyXG4gIH07XHJcblxyXG4gIE9iamVjdFN0b3JlLnByb3RvdHlwZS5pbmRleCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIG5ldyBJbmRleCh0aGlzLl9zdG9yZS5pbmRleC5hcHBseSh0aGlzLl9zdG9yZSwgYXJndW1lbnRzKSk7XHJcbiAgfTtcclxuXHJcbiAgcHJveHlQcm9wZXJ0aWVzKE9iamVjdFN0b3JlLCAnX3N0b3JlJywgW1xyXG4gICAgJ25hbWUnLFxyXG4gICAgJ2tleVBhdGgnLFxyXG4gICAgJ2luZGV4TmFtZXMnLFxyXG4gICAgJ2F1dG9JbmNyZW1lbnQnXHJcbiAgXSk7XHJcblxyXG4gIHByb3h5UmVxdWVzdE1ldGhvZHMoT2JqZWN0U3RvcmUsICdfc3RvcmUnLCBJREJPYmplY3RTdG9yZSwgW1xyXG4gICAgJ3B1dCcsXHJcbiAgICAnYWRkJyxcclxuICAgICdkZWxldGUnLFxyXG4gICAgJ2NsZWFyJyxcclxuICAgICdnZXQnLFxyXG4gICAgJ2dldEFsbCcsXHJcbiAgICAnZ2V0S2V5JyxcclxuICAgICdnZXRBbGxLZXlzJyxcclxuICAgICdjb3VudCdcclxuICBdKTtcclxuXHJcbiAgcHJveHlDdXJzb3JSZXF1ZXN0TWV0aG9kcyhPYmplY3RTdG9yZSwgJ19zdG9yZScsIElEQk9iamVjdFN0b3JlLCBbXHJcbiAgICAnb3BlbkN1cnNvcicsXHJcbiAgICAnb3BlbktleUN1cnNvcidcclxuICBdKTtcclxuXHJcbiAgcHJveHlNZXRob2RzKE9iamVjdFN0b3JlLCAnX3N0b3JlJywgSURCT2JqZWN0U3RvcmUsIFtcclxuICAgICdkZWxldGVJbmRleCdcclxuICBdKTtcclxuXHJcbiAgZnVuY3Rpb24gVHJhbnNhY3Rpb24oaWRiVHJhbnNhY3Rpb24pIHtcclxuICAgIHRoaXMuX3R4ID0gaWRiVHJhbnNhY3Rpb247XHJcbiAgICB0aGlzLmNvbXBsZXRlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgIGlkYlRyYW5zYWN0aW9uLm9uY29tcGxldGUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgIH07XHJcbiAgICAgIGlkYlRyYW5zYWN0aW9uLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZWplY3QoaWRiVHJhbnNhY3Rpb24uZXJyb3IpO1xyXG4gICAgICB9O1xyXG4gICAgICBpZGJUcmFuc2FjdGlvbi5vbmFib3J0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmVqZWN0KGlkYlRyYW5zYWN0aW9uLmVycm9yKTtcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgVHJhbnNhY3Rpb24ucHJvdG90eXBlLm9iamVjdFN0b3JlID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gbmV3IE9iamVjdFN0b3JlKHRoaXMuX3R4Lm9iamVjdFN0b3JlLmFwcGx5KHRoaXMuX3R4LCBhcmd1bWVudHMpKTtcclxuICB9O1xyXG5cclxuICBwcm94eVByb3BlcnRpZXMoVHJhbnNhY3Rpb24sICdfdHgnLCBbXHJcbiAgICAnb2JqZWN0U3RvcmVOYW1lcycsXHJcbiAgICAnbW9kZSdcclxuICBdKTtcclxuXHJcbiAgcHJveHlNZXRob2RzKFRyYW5zYWN0aW9uLCAnX3R4JywgSURCVHJhbnNhY3Rpb24sIFtcclxuICAgICdhYm9ydCdcclxuICBdKTtcclxuXHJcbiAgZnVuY3Rpb24gVXBncmFkZURCKGRiLCBvbGRWZXJzaW9uLCB0cmFuc2FjdGlvbikge1xyXG4gICAgdGhpcy5fZGIgPSBkYjtcclxuICAgIHRoaXMub2xkVmVyc2lvbiA9IG9sZFZlcnNpb247XHJcbiAgICB0aGlzLnRyYW5zYWN0aW9uID0gbmV3IFRyYW5zYWN0aW9uKHRyYW5zYWN0aW9uKTtcclxuICB9XHJcblxyXG4gIFVwZ3JhZGVEQi5wcm90b3R5cGUuY3JlYXRlT2JqZWN0U3RvcmUgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiBuZXcgT2JqZWN0U3RvcmUodGhpcy5fZGIuY3JlYXRlT2JqZWN0U3RvcmUuYXBwbHkodGhpcy5fZGIsIGFyZ3VtZW50cykpO1xyXG4gIH07XHJcblxyXG4gIHByb3h5UHJvcGVydGllcyhVcGdyYWRlREIsICdfZGInLCBbXHJcbiAgICAnbmFtZScsXHJcbiAgICAndmVyc2lvbicsXHJcbiAgICAnb2JqZWN0U3RvcmVOYW1lcydcclxuICBdKTtcclxuXHJcbiAgcHJveHlNZXRob2RzKFVwZ3JhZGVEQiwgJ19kYicsIElEQkRhdGFiYXNlLCBbXHJcbiAgICAnZGVsZXRlT2JqZWN0U3RvcmUnLFxyXG4gICAgJ2Nsb3NlJ1xyXG4gIF0pO1xyXG5cclxuICBmdW5jdGlvbiBEQihkYikge1xyXG4gICAgdGhpcy5fZGIgPSBkYjtcclxuICB9XHJcblxyXG4gIERCLnByb3RvdHlwZS50cmFuc2FjdGlvbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIG5ldyBUcmFuc2FjdGlvbih0aGlzLl9kYi50cmFuc2FjdGlvbi5hcHBseSh0aGlzLl9kYiwgYXJndW1lbnRzKSk7XHJcbiAgfTtcclxuXHJcbiAgcHJveHlQcm9wZXJ0aWVzKERCLCAnX2RiJywgW1xyXG4gICAgJ25hbWUnLFxyXG4gICAgJ3ZlcnNpb24nLFxyXG4gICAgJ29iamVjdFN0b3JlTmFtZXMnXHJcbiAgXSk7XHJcblxyXG4gIHByb3h5TWV0aG9kcyhEQiwgJ19kYicsIElEQkRhdGFiYXNlLCBbXHJcbiAgICAnY2xvc2UnXHJcbiAgXSk7XHJcblxyXG4gIC8vIEFkZCBjdXJzb3IgaXRlcmF0b3JzXHJcbiAgLy8gVE9ETzogcmVtb3ZlIHRoaXMgb25jZSBicm93c2VycyBkbyB0aGUgcmlnaHQgdGhpbmcgd2l0aCBwcm9taXNlc1xyXG4gIFsnb3BlbkN1cnNvcicsICdvcGVuS2V5Q3Vyc29yJ10uZm9yRWFjaChmdW5jdGlvbihmdW5jTmFtZSkge1xyXG4gICAgW09iamVjdFN0b3JlLCBJbmRleF0uZm9yRWFjaChmdW5jdGlvbihDb25zdHJ1Y3Rvcikge1xyXG4gICAgICAvLyBEb24ndCBjcmVhdGUgaXRlcmF0ZUtleUN1cnNvciBpZiBvcGVuS2V5Q3Vyc29yIGRvZXNuJ3QgZXhpc3QuXHJcbiAgICAgIGlmICghKGZ1bmNOYW1lIGluIENvbnN0cnVjdG9yLnByb3RvdHlwZSkpIHJldHVybjtcclxuXHJcbiAgICAgIENvbnN0cnVjdG9yLnByb3RvdHlwZVtmdW5jTmFtZS5yZXBsYWNlKCdvcGVuJywgJ2l0ZXJhdGUnKV0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgYXJncyA9IHRvQXJyYXkoYXJndW1lbnRzKTtcclxuICAgICAgICB2YXIgY2FsbGJhY2sgPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgdmFyIG5hdGl2ZU9iamVjdCA9IHRoaXMuX3N0b3JlIHx8IHRoaXMuX2luZGV4O1xyXG4gICAgICAgIHZhciByZXF1ZXN0ID0gbmF0aXZlT2JqZWN0W2Z1bmNOYW1lXS5hcHBseShuYXRpdmVPYmplY3QsIGFyZ3Muc2xpY2UoMCwgLTEpKTtcclxuICAgICAgICByZXF1ZXN0Lm9uc3VjY2VzcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgY2FsbGJhY2socmVxdWVzdC5yZXN1bHQpO1xyXG4gICAgICAgIH07XHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuICB9KTtcclxuXHJcbiAgLy8gcG9seWZpbGwgZ2V0QWxsXHJcbiAgW0luZGV4LCBPYmplY3RTdG9yZV0uZm9yRWFjaChmdW5jdGlvbihDb25zdHJ1Y3Rvcikge1xyXG4gICAgaWYgKENvbnN0cnVjdG9yLnByb3RvdHlwZS5nZXRBbGwpIHJldHVybjtcclxuICAgIENvbnN0cnVjdG9yLnByb3RvdHlwZS5nZXRBbGwgPSBmdW5jdGlvbihxdWVyeSwgY291bnQpIHtcclxuICAgICAgdmFyIGluc3RhbmNlID0gdGhpcztcclxuICAgICAgdmFyIGl0ZW1zID0gW107XHJcblxyXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xyXG4gICAgICAgIGluc3RhbmNlLml0ZXJhdGVDdXJzb3IocXVlcnksIGZ1bmN0aW9uKGN1cnNvcikge1xyXG4gICAgICAgICAgaWYgKCFjdXJzb3IpIHtcclxuICAgICAgICAgICAgcmVzb2x2ZShpdGVtcyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGl0ZW1zLnB1c2goY3Vyc29yLnZhbHVlKTtcclxuXHJcbiAgICAgICAgICBpZiAoY291bnQgIT09IHVuZGVmaW5lZCAmJiBpdGVtcy5sZW5ndGggPT0gY291bnQpIHtcclxuICAgICAgICAgICAgcmVzb2x2ZShpdGVtcyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcbiAgfSk7XHJcblxyXG4gIHZhciBleHAgPSB7XHJcbiAgICBvcGVuOiBmdW5jdGlvbihuYW1lLCB2ZXJzaW9uLCB1cGdyYWRlQ2FsbGJhY2spIHtcclxuICAgICAgdmFyIHAgPSBwcm9taXNpZnlSZXF1ZXN0Q2FsbChpbmRleGVkREIsICdvcGVuJywgW25hbWUsIHZlcnNpb25dKTtcclxuICAgICAgdmFyIHJlcXVlc3QgPSBwLnJlcXVlc3Q7XHJcblxyXG4gICAgICBpZiAocmVxdWVzdCkge1xyXG4gICAgICAgIHJlcXVlc3Qub251cGdyYWRlbmVlZGVkID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgIGlmICh1cGdyYWRlQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgdXBncmFkZUNhbGxiYWNrKG5ldyBVcGdyYWRlREIocmVxdWVzdC5yZXN1bHQsIGV2ZW50Lm9sZFZlcnNpb24sIHJlcXVlc3QudHJhbnNhY3Rpb24pKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gcC50aGVuKGZ1bmN0aW9uKGRiKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBEQihkYik7XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIGRlbGV0ZTogZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdENhbGwoaW5kZXhlZERCLCAnZGVsZXRlRGF0YWJhc2UnLCBbbmFtZV0pO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBleHA7XHJcbiAgICBtb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gbW9kdWxlLmV4cG9ydHM7XHJcbiAgfVxyXG4gIGVsc2Uge1xyXG4gICAgc2VsZi5pZGIgPSBleHA7XHJcbiAgfVxyXG59KCkpOyJdfQ==
