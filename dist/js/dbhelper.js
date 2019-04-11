const dbPromise=idb.open("restaurant-db",4,function(e){switch(e.oldVersion){case 0:e.createObjectStore("restaurant-store",{keyPath:"id"}).createIndex("restaurantIndex","is_favorite");case 1:e.createObjectStore("review-store",{keyPath:"id"}).createIndex("reviewIndex","restaurant_id"),e.createObjectStore("favorite-store",{keyPath:"is_favorite"});case 2:e.createObjectStore("offline-store",{keyPath:"name",autoIncrement:!0}).createIndex("offlineIndex","restaurant_id")}});class DBHelper{static get DATABASE_URL(){return"https://restaurant-review-server1.herokuapp.com/"}static fetchRestaurants(e){function t(){dbPromise.then(e=>e.transaction("restaurant-store").objectStore("restaurant-store").getAll()).then(t=>e(null,t))}fetch(`${DBHelper.DATABASE_URL}/restaurants/`).then(function(e){return e.json()}).then(e=>(dbPromise.then(t=>{const r=t.transaction("restaurant-store","readwrite"),n=r.objectStore("restaurant-store");for(const t of e)n.put(t);return r.complete}),e)).then(function(t){return e(null,t)}).catch(()=>t())}static fetchReviews(e,t){function r(){dbPromise.then(e=>{e.transaction("review-store","readwrite").objectStore("review-store").index("reviewIndex").openCursor().then(e=>e.advance(15)).then(function e(t){t&&(t.delete(),t.continue().then(e))})})}fetch(`${DBHelper.DATABASE_URL}/reviews/?restaurant_id=${+e}`).then(function(e){return e.json()}).then(e=>(dbPromise.then(t=>{const r=t.transaction("review-store","readwrite"),n=r.objectStore("review-store");for(const t of e)n.put(t);return r.complete}),e)).then(function(e){return r(),t(null,e)}).catch(()=>(r(),dbPromise.then(r=>r.transaction("review-store").objectStore("review-store").index("reviewIndex").getAll(IDBKeyRange.only(+e)).then(e=>{console.log(null,e),t(null,e)}))&&dbPromise.then(e=>e.transaction("offline-store").objectStore("offline-store").index("offlineIndex").getAll().then(e=>{console.log(null,e),t(null,e)}))))}static fetchRestaurantById(e,t){DBHelper.fetchRestaurants((r,n)=>{if(r)t(r,null);else{const r=n.find(t=>t.id==e);r?t(null,r):t("Restaurant does not exist",null)}})}static fetchReviewById(e,t){DBHelper.fetchReviews((r,n)=>{if(r)t(r,null);else{const r=n.find(t=>t.id==e);r?t(null,r):t("Review does not exist",null)}})}static fetchRestaurantByCuisine(e,t){DBHelper.fetchRestaurants((r,n)=>{if(r)t(r,null);else{const r=n.filter(t=>t.cuisine_type==e);t(null,r)}})}static fetchRestaurantByNeighborhood(e,t){DBHelper.fetchRestaurants((r,n)=>{if(r)t(r,null);else{const r=n.filter(t=>t.neighborhood==e);t(null,r)}})}static fetchRestaurantByCuisineAndNeighborhood(e,t,r){DBHelper.fetchRestaurants((n,s)=>{if(n)r(n,null);else{let n=s;"all"!=e&&(n=n.filter(t=>t.cuisine_type==e)),"all"!=t&&(n=n.filter(e=>e.neighborhood==t)),r(null,n)}})}static fetchNeighborhoods(e){DBHelper.fetchRestaurants((t,r)=>{if(t)e(t,null);else{const t=r.map((e,t)=>r[t].neighborhood),n=t.filter((e,r)=>t.indexOf(e)==r);e(null,n)}})}static fetchCuisines(e){DBHelper.fetchRestaurants((t,r)=>{if(t)e(t,null);else{const t=r.map((e,t)=>r[t].cuisine_type),n=t.filter((e,r)=>t.indexOf(e)==r);e(null,n)}})}static urlForRestaurant(e){return`./restaurant.html?id=${e.id}`}static imageUrlForRestaurant(e){return`/src/img/${e.id}-300_small.jpg`}static imageSrcsetForIndex(e){return`src/images/${e.id}-300_small.jpg 1x, src/images/${e.id}-600_medium_2x.jpg 2x`}static imageSrcsetForRestaurant(e){return`src/images/${e.id}-300_small.jpg 300w, src/images/${e.id}-600_medium_2x.jpg 600w, src/images/${e.id}-800_large_2x.jpg 800w`}static saveFavorite(e,t){const r=`${DBHelper.DATABASE_URL}/restaurants/${e}/?is_favorite=${t}`;DBHelper.fetchRestaurantById(e,(e,n)=>{e||(n.is_favorite=t,console.log(t),dbPromise.then(e=>{const s=e.transaction("restaurant-store","readwrite"),a=s.objectStore("restaurant-store");return console.log(r),a.put(n).then(e=>{console.log(s),console.log(t),console.log(r),console.log(n.is_favorite),fetch(r,{method:"PUT"})}),s.complete&&n}).catch(e=>(DBHelper.fetchRestaurants(e=>dbPromise.then(t=>{const r=t.transaction("restaurant-store","readwrite").objectStore("restaurant-store").index("restaurantIndex","readwrite").getAll("is_favorite");return console.log(null,r),e(null,r)})),console.log(n.is_favorite),n.is_favorite)))})}static mapMarkerForRestaurant(e,t){const r=new L.marker([e.latlng.lat,e.latlng.lng],{title:e.name,alt:e.name,url:DBHelper.urlForRestaurant(e)});return r.addTo(newMap),r}}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRiaGVscGVyLmpzIl0sIm5hbWVzIjpbImRiUHJvbWlzZSIsImlkYiIsIm9wZW4iLCJ1cGdyYWRlREIiLCJrZXlQYXRoIiwib2xkVmVyc2lvbiIsImNyZWF0ZUluZGV4IiwiY3JlYXRlT2JqZWN0U3RvcmUiLCJyZXZpZXdTdG9yZSIsImF1dG9JbmNyZW1lbnQiLCJvZmZsaW5lU3RvcmUiLCJEQVRBQkFTRV9VUkwiLCJbb2JqZWN0IE9iamVjdF0iLCJjYWxsYmFjayIsImZ1bGZpbGxSZXN1bHQiLCJ0aGVuIiwiZGIiLCJ0cmFuc2FjdGlvbiIsImZldGNoUmVzdGF1cmFudHMiLCJnZXREYkRhdGEiLCJyZXN0YXVyYW50cyIsImZldGNoIiwiREJIZWxwZXIiLCJyZXNwb25zZSIsImpzb24iLCJ0eCIsIm9iamVjdFN0b3JlIiwicmVzdGF1cmFudCIsInJlc3RhdXJhbnRTdG9yZSIsImNvbXBsZXRlIiwiY2F0Y2giLCJjb3VudEN1cnNvciIsImZldGNoUmV2aWV3cyIsImluZGV4Iiwib3BlbkN1cnNvciIsImN1cnNvciIsInN0b3JlIiwiY29udGludWUiLCJkZWxldGVSZXN0IiwiaWQiLCJyZXZpZXdzIiwicmV2aWV3IiwiZ2V0QWxsIiwib25seSIsImNvbnNvbGUiLCJvZmZSZXZpZXdzIiwiZXJyb3IiLCJmZXRjaFJlc3RhdXJhbnRCeUlkIiwiciIsImNiIiwiZmluZCIsImZldGNoUmV2aWV3QnlJZCIsImN1aXNpbmUiLCJyZXN1bHRzIiwiZmlsdGVyIiwiY3Vpc2luZV90eXBlIiwibmVpZ2hib3Job29kIiwibmVpZ2hib3Job29kcyIsIm1hcCIsInYiLCJpIiwidW5pcXVlTmVpZ2hib3Job29kcyIsImluZGV4T2YiLCJmZXRjaE5laWdoYm9yaG9vZHMiLCJjdWlzaW5lcyIsInVuaXF1ZUN1aXNpbmVzIiwiaXNmYXZvcml0ZSIsInVybCIsImlzX2Zhdm9yaXRlIiwibG9nIiwiaW1hZ2VTcmNzZXRGb3JSZXN0YXVyYW50IiwicHV0IiwibWV0aG9kIiwiZmF2cyIsIkwiLCJtYXJrZXIiLCJsYXRsbmciLCJsYXQiLCJsbmciLCJ0aXRsZSIsIm5hbWUiLCJhbHQiLCJhZGRUbyIsIm5ld01hcCJdLCJtYXBwaW5ncyI6IkFBZUksTUFBQUEsVUFBQUMsSUFBQUMsS0FBQSxnQkFBQSxFQUFBLFNBQUFDLEdBQzBFQyxPQUFBQSxFQUFTQyxZQUFYLEtBQXZFLEVBQ2dCQyxFQUFZQyxrQkFBbUIsbUJBQS9DLENBQUFILFFBQUEsT0FBZ0JFLFlBQVksa0JBQW1CLGVBQy9DLEtBQUEsRUFDbUJILEVBQVVJLGtCQUFrQixlQUFnQixDQUFBSCxRQUFBLE9BQVdFLFlBQUEsY0FBQSxpQkFBWEgsRUFBOURJLGtCQUFBLGlCQUFBLENBQUFILFFBQUEsZ0JBQ0FJLEtBQUFBLEVBQ1VELEVBQWtCQSxrQkFBa0IsZ0JBQUEsQ0FBQUgsUUFBQSxPQUFBSyxlQUFBLElBQVdILFlBQUEsZUFBQSxvQkFHdkRJLE1BQUFBLFNBYU5DLDBCQUpBLE1BQUEsbURBaUJBQyx3QkFBd0JDLEdBTW5CLFNBSkRDLElBQU9kLFVBQVVlLEtBQUtDLEdBQ1RBLEVBQUdDLFlBQVksb0JBSHpCQyxZQUFBQSxvQkFDSUMsVUFNUkosS0FBQUssR0FJVVAsRUFBUyxLQUFNTyxJQUV6QkMsU0FFTEMsU0FBQVgsNkJBRU9JLEtBQUssU0FBVVEsR0FEbEJGLE9BRXdCRSxFQUFTQyxTQUE3QlQsS0FBTUssSUFDTnBCLFVBQU9vQixLQUFBQSxJQUNOTCxNQUFLSyxFQUFBQSxFQUFXSCxZQUFJLG1CQUFBLGFBQ1hGLEVBQVdVLEVBQUFDLFlBQUEsb0JBQ25CLElBQU1ELE1BQU9FLEtBQWFQLEVBQzFCUSxFQUFNQSxJQUFrQkgsR0FDeEIsT0FBS0EsRUFBTUUsV0FFVlAsSUFJRkwsS0FBSyxTQUFVSyxHQUhkLE9BQU9LLEVBQUdJLEtBQVZULEtBTkZVLE1BQUEsSUFRT1YsS0FJUFIsb0JBQU9FLEVBQWFELEdBRXpCLFNBQUFrQixJQUtHL0IsVUFBVWUsS0FBS0MsSUFIWmdCLEVBQUFBLFlBQWlCbkIsZUFBVSxhQUV2QmtCLFlB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QUFNOEMsRUFBSyxDQUNUSyxPQUFRLFVBbEJUL0MsRUFBSUksVUFBV2xCLElBc0JqQm1CLE1BQU9qQixJQWxCVlMsU0FBVUosaUJBQUFMLEdBQ1ZjLFVBQVd5QyxLQUFYcEQsSUFDQTRCLE1BSVV5QixFQUpFSCxFQUFBQSxZQUFaLG1CQUFBLGFBRTRCeEMsWUFBQSxvQkFDQ0EsTUFBWSxrQkFBdkMsYUFDQWdCLE9BQUEsZUFJRUUsT0FEQUEsUUFBUXlCLElBQVIsS0FBQUksR0FDUUosRUFBSUgsS0FBWk8sTUFHQXBELFFBQUFBLElBQU04QyxFQUFLQyxhQUNUSSxFQUFRSixpQkFXUnhELDhCQUFjZ0IsRUFBZ0JLLEdBRzlCVyxNQUFBQSxFQUFPLElBQVA4QixFQUFZQyxPQUFNRixDQUFBQSxFQUFsQkcsT0FBQUMsSUFBQWxELEVBQUFpRCxPQUFBRSxLQUNELENBQ0RDLE1BVEhwRCxFQUFBcUQsS0FVRUMsSUFYRHRELEVBQUFxRCxLQVlGcEMsSUFBQUEsU0FBWWpCLGlCQUFXeUMsS0FHMUIsT0FERU8sRUEvQkNPLE1BQUFDLFFBSkZSIiwiZmlsZSI6ImRiaGVscGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gZXhwb3J0IGRlZmF1bHQgREJIZWxwZXJcclxuXHJcblxyXG4oZnVuY3Rpb24gKCkge1xyXG4gICd1c2Ugc3RyaWN0J1xyXG5cclxuICBpZiAoISgnaW5kZXhlZERCJyBpbiB3aW5kb3cpKSB7XHJcbiAgICBjb25zb2xlLmxvZygnVGhpcyBicm93c2VyIGRvZXNuXFwndCBzdXBwb3J0IEluZGV4ZWREQicpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxufSk7XHJcblxyXG5jb25zdCBkYlByb21pc2UgPSBpZGIub3BlbigncmVzdGF1cmFudC1kYicsIDQsIGZ1bmN0aW9uICh1cGdyYWRlREIpIHtcclxuXHJcbiAgc3dpdGNoICh1cGdyYWRlREIub2xkVmVyc2lvbikge1xyXG4gICAgY2FzZSAwOlxyXG4gICAgIGxldCByZXN0YXVyYW50U3RvcmUgPSAgdXBncmFkZURCLmNyZWF0ZU9iamVjdFN0b3JlKCdyZXN0YXVyYW50LXN0b3JlJywgeyBrZXlQYXRoOiAnaWQnIH0pO1xyXG4gICAgIHJlc3RhdXJhbnRTdG9yZS5jcmVhdGVJbmRleCgncmVzdGF1cmFudEluZGV4JywgJ2lzX2Zhdm9yaXRlJyk7XHJcbiAgICAgY2FzZSAxOlxyXG4gICAgICBsZXQgcmV2aWV3U3RvcmUgPSB1cGdyYWRlREIuY3JlYXRlT2JqZWN0U3RvcmUoJ3Jldmlldy1zdG9yZScsIHsga2V5UGF0aDogJ2lkJyB9KTtcclxuICAgICAgcmV2aWV3U3RvcmUuY3JlYXRlSW5kZXgoJ3Jldmlld0luZGV4JywgJ3Jlc3RhdXJhbnRfaWQnKTtcclxuICAgICAgdXBncmFkZURCLmNyZWF0ZU9iamVjdFN0b3JlKCdmYXZvcml0ZS1zdG9yZScsIHsga2V5UGF0aDogJ2lzX2Zhdm9yaXRlJyB9KTtcclxuICAgICAgY2FzZSAyOiBcclxuICAgICAgbGV0IG9mZmxpbmVTdG9yZSA9IHVwZ3JhZGVEQi5jcmVhdGVPYmplY3RTdG9yZSgnb2ZmbGluZS1zdG9yZScsIHtrZXlQYXRoOiAnbmFtZScsIGF1dG9JbmNyZW1lbnQ6IHRydWV9KTtcclxuICAgICAgICBvZmZsaW5lU3RvcmUuY3JlYXRlSW5kZXgoJ29mZmxpbmVJbmRleCcsICdyZXN0YXVyYW50X2lkJyk7XHJcbiAgfVxyXG5cclxufSk7XHJcblxyXG4vKipcclxuICogQ29tbW9uIGRhdGFiYXNlIGhlbHBlciBmdW5jdGlvbnMuXHJcbiAqL1xyXG5jbGFzcyBEQkhlbHBlciB7XHJcbiAgLyoqXHJcbiAgICAgKiBEYXRhYmFzZSBVUkwuXHJcbiAgICAgKiBDaGFuZ2UgdGhpcyB0byByZXN0YXVyYW50cy5qc29uIGZpbGUgbG9jYXRpb24gb24geW91ciBzZXJ2ZXIuXHJcbiAgICAgKi9cclxuICBzdGF0aWMgZ2V0IERBVEFCQVNFX1VSTCgpIHtcclxuICAgIGNvbnN0IHBvcnQgPSAxMzM3IC8vIENoYW5nZSB0aGlzIHRvIHlvdXIgc2VydmVyIHBvcnRcclxuXHJcbiAgICByZXR1cm4gYGh0dHBzOi8vcmVzdGF1cmFudC1yZXZpZXctc2VydmVyMS5oZXJva3VhcHAuY29tL2A7XHJcblxyXG4gICAgLy8gcmV0dXJuIGBodHRwczovL2RpbmRlcmEuZ2l0aHViLmlvLyR7cG9ydH0vZGF0YS9yZXN0YXVyYW50cy5qc29uYDtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBGZXRjaCBhbGwgcmVzdGF1cmFudHMuXHJcbiAgICovXHJcblxyXG4gIHN0YXRpYyBmZXRjaFJlc3RhdXJhbnRzKGNhbGxiYWNrKSB7XHJcbiAgICBmdW5jdGlvbiBnZXREYkRhdGEoKSB7XHJcbiAgICAgIHJldHVybiBkYlByb21pc2UudGhlbihkYiA9PiB7XHJcbiAgICAgICAgY29uc3QgdHggPSBkYi50cmFuc2FjdGlvbigncmVzdGF1cmFudC1zdG9yZScpXHJcbiAgICAgICAgICAub2JqZWN0U3RvcmUoJ3Jlc3RhdXJhbnQtc3RvcmUnKTtcclxuICAgICAgICByZXR1cm4gdHguZ2V0QWxsKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGxSZXN1bHQoKSB7XHJcbiAgICAgIGdldERiRGF0YSgpLnRoZW4ocmVzdGF1cmFudHMgPT4ge1xyXG4gICAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCByZXN0YXVyYW50cyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuLy8gZmV0Y2ggUmVzdGF1cmFudFxyXG4gICAgZmV0Y2goYCR7REJIZWxwZXIuREFUQUJBU0VfVVJMfS9yZXN0YXVyYW50cy9gKVxyXG4gICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICBjb25zdCByZXN0YXVyYW50cyA9IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICByZXR1cm4gcmVzdGF1cmFudHM7XHJcbiAgICAgIH0pLnRoZW4ocmVzdGF1cmFudHMgPT4ge1xyXG4gICAgICAgIGRiUHJvbWlzZS50aGVuKGRiID0+IHtcclxuICAgICAgICAgIGNvbnN0IHR4ID0gZGIudHJhbnNhY3Rpb24oJ3Jlc3RhdXJhbnQtc3RvcmUnLCAncmVhZHdyaXRlJyk7XHJcbiAgICAgICAgICBjb25zdCByZXN0YXVyYW50U3RvcmUgPSB0eC5vYmplY3RTdG9yZSgncmVzdGF1cmFudC1zdG9yZScpO1xyXG4gICAgICAgICAgZm9yIChjb25zdCByZXN0YXVyYW50IG9mIHJlc3RhdXJhbnRzKSB7XHJcbiAgICAgICAgICAgIHJlc3RhdXJhbnRTdG9yZS5wdXQocmVzdGF1cmFudCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gdHguY29tcGxldGU7XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gcmVzdGF1cmFudHM7XHJcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3RhdXJhbnRzKSB7XHJcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIHJlc3RhdXJhbnRzKTtcclxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmdWxmaWxsUmVzdWx0KCk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZldGNoUmV2aWV3cyhpZCwgY2FsbGJhY2spIHtcclxuXHJcbiAgICBmdW5jdGlvbiBjb3VudEN1cnNvcigpICB7XHJcbiAgICAgIGRiUHJvbWlzZS50aGVuKGRiPT4ge1xyXG4gICAgICAgIGxldCB0eCA9IGRiLnRyYW5zYWN0aW9uKCdyZXZpZXctc3RvcmUnLCAncmVhZHdyaXRlJyk7XHJcbiAgICAgICAgbGV0IHN0b3JlID0gdHgub2JqZWN0U3RvcmUoJ3Jldmlldy1zdG9yZScpO1xyXG4gICAgICAgICBzdG9yZS5pbmRleCgncmV2aWV3SW5kZXgnKS5vcGVuQ3Vyc29yKCkudGhlbihjdXJzb3I9PiB7XHJcbiAgICAgICAgICAgcmV0dXJuIGN1cnNvci5hZHZhbmNlKDE1KTtcclxuICAgICAgICAgfSkudGhlbihmdW5jdGlvbiBkZWxldGVSZXN0KGN1cnNvcil7XHJcbiAgICAgICAgICAgaWYoIWN1cnNvcikgcmV0dXJuO1xyXG4gICAgICAgICAgIGN1cnNvci5kZWxldGUoKTtcclxuICAgICAgICAgICBjdXJzb3IuY29udGludWUoKS50aGVuKGRlbGV0ZVJlc3QpO1xyXG4gICAgICAgICB9KTtcclxuICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRPZmxsaW5lU3RvcmUoKXtcclxuICAgICAgcmV0dXJuIGRiUHJvbWlzZS50aGVuKGRiID0+IHtcclxuICAgICAgICBjb25zdCB0eCA9IGRiLnRyYW5zYWN0aW9uKCdvZmZsaW5lLXN0b3JlJylcclxuICAgICAgICBjb25zdCBvZmZsaW5lU3RvcmUgPSB0eC5vYmplY3RTdG9yZSgnb2ZmbGluZS1zdG9yZScpO1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gb2ZmbGluZVN0b3JlLmluZGV4KCdvZmZsaW5lSW5kZXgnKTtcclxuICAgICAgICByZXR1cm4gaW5kZXguZ2V0QWxsKCkudGhlbihvZmZSZXZpZXdzID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKG51bGwsIG9mZlJldmlld3MpO1xyXG4gICAgICAgICAgIGNhbGxiYWNrKG51bGwsIG9mZlJldmlld3MpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICAvLyBkaXNwbGF5IHRoZSByZXZpZXdzIHdoZW4gb2ZmbGluZVxyXG4gICAgZnVuY3Rpb24gZ2V0RGJSZXZpZXcoKSB7XHJcbiAgICAgIHJldHVybiBkYlByb21pc2UudGhlbihkYiA9PiB7XHJcbiAgICAgICAgY29uc3QgdHggPSBkYi50cmFuc2FjdGlvbigncmV2aWV3LXN0b3JlJylcclxuICAgICAgICBjb25zdCByZXZpZXdTdG9yZSA9IHR4Lm9iamVjdFN0b3JlKCdyZXZpZXctc3RvcmUnKTtcclxuICAgICAgICBjb25zdCBpbmRleCA9IHJldmlld1N0b3JlLmluZGV4KCdyZXZpZXdJbmRleCcpO1xyXG4gICAgICAgIC8vIGdldCByZXN0YXVyYW50X2lkIG9mIGEgc3BlY2lmaWMgbnVtYmVyXHJcbiAgICAgICAgcmV0dXJuIGluZGV4LmdldEFsbChJREJLZXlSYW5nZS5vbmx5KCtpZCkpLnRoZW4ocmV2aWV3cyA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG51bGwsIHJldmlld3MpXHJcbiAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgcmV2aWV3cyk7XHJcbiAgICAgICAgICB9KTsgXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBmZXRjaChgJHtEQkhlbHBlci5EQVRBQkFTRV9VUkx9L3Jldmlld3MvP3Jlc3RhdXJhbnRfaWQ9JHsraWR9YClcclxuICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgY29uc3QgcmV2aWV3cyA9IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICByZXR1cm4gcmV2aWV3cztcclxuICAgICAgfSkudGhlbihyZXZpZXdzID0+IHtcclxuICAgICAgICBkYlByb21pc2UudGhlbihkYiA9PiB7XHJcbiAgICAgICAgICAvL3NhdmUgcmV2aWV3cyBpbiBkYlxyXG4gICAgICAgICAgY29uc3QgdHggPSBkYi50cmFuc2FjdGlvbigncmV2aWV3LXN0b3JlJywgJ3JlYWR3cml0ZScpO1xyXG4gICAgICAgICAgY29uc3QgcmV2aWV3U3RvcmUgPSB0eC5vYmplY3RTdG9yZSgncmV2aWV3LXN0b3JlJyk7XHJcbiAgICAgICAgICBmb3IgKGNvbnN0IHJldmlldyBvZiByZXZpZXdzKSB7XHJcbiAgICAgICAgICAgIHJldmlld1N0b3JlLnB1dChyZXZpZXcpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIHR4LmNvbXBsZXRlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiByZXZpZXdzO1xyXG4gICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXZpZXdzKSB7XHJcbiAgICAgICAgY291bnRDdXJzb3IoKVxyXG4gICAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCByZXZpZXdzKTtcclxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIGNvdW50Q3Vyc29yKClcclxuICAgICAgICByZXR1cm4gZ2V0RGJSZXZpZXcoKSAmJiBnZXRPZmxsaW5lU3RvcmUoKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogRmV0Y2ggYSByZXN0YXVyYW50IGJ5IGl0cyBJRC5cclxuICAgKi9cclxuICBzdGF0aWMgZmV0Y2hSZXN0YXVyYW50QnlJZChpZCwgY2FsbGJhY2spIHtcclxuICAgIC8vIGZldGNoIGFsbCByZXN0YXVyYW50cyB3aXRoIHByb3BlciBlcnJvciBoYW5kbGluZy5cclxuICAgIERCSGVscGVyLmZldGNoUmVzdGF1cmFudHMoKGVycm9yLCByZXN0YXVyYW50cykgPT4ge1xyXG4gICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICBjYWxsYmFjayhlcnJvciwgbnVsbCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgcmVzdGF1cmFudCA9IHJlc3RhdXJhbnRzLmZpbmQociA9PiByLmlkID09IGlkKTtcclxuICAgICAgICBpZiAocmVzdGF1cmFudCkgeyAvLyBHb3QgdGhlIHJlc3RhdXJhbnRcclxuICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3RhdXJhbnQpO1xyXG4gICAgICAgIH0gZWxzZSB7IC8vIFJlc3RhdXJhbnQgZG9lcyBub3QgZXhpc3QgaW4gdGhlIGRhdGFiYXNlXHJcbiAgICAgICAgICBjYWxsYmFjaygnUmVzdGF1cmFudCBkb2VzIG5vdCBleGlzdCcsIG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICogRmV0Y2ggYSByZXZpZXcgYnkgaXRzIElELlxyXG4gKi9cclxuICBzdGF0aWMgZmV0Y2hSZXZpZXdCeUlkKGlkLCBjYikge1xyXG4gICAgLy8gZmV0Y2ggYWxsIHJldmlld3Mgd2l0aCBwcm9wZXIgZXJyb3IgaGFuZGxpbmcuXHJcbiAgICBEQkhlbHBlci5mZXRjaFJldmlld3MoKGVycm9yLCByZXZpZXdzKSA9PiB7XHJcbiAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgIGNiKGVycm9yLCBudWxsKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCByZXZpZXcgPSByZXZpZXdzLmZpbmQociA9PiByLmlkID09IGlkKTtcclxuICAgICAgICBpZiAocmV2aWV3KSB7IC8vIEdvdCB0aGUgcmV2aWV3XHJcbiAgICAgICAgICBjYihudWxsLCByZXZpZXcpO1xyXG4gICAgICAgIH0gZWxzZSB7IC8vIFJlc3RhdXJhbnQgZG9lcyBub3QgZXhpc3QgaW4gdGhlIGRhdGFiYXNlXHJcbiAgICAgICAgICBjYignUmV2aWV3IGRvZXMgbm90IGV4aXN0JywgbnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZldGNoIHJlc3RhdXJhbnRzIGJ5IGEgY3Vpc2luZSB0eXBlIHdpdGggcHJvcGVyIGVycm9yIGhhbmRsaW5nLlxyXG4gICAqL1xyXG4gIHN0YXRpYyBmZXRjaFJlc3RhdXJhbnRCeUN1aXNpbmUoY3Vpc2luZSwgY2FsbGJhY2spIHtcclxuICAgIC8vIEZldGNoIGFsbCByZXN0YXVyYW50cyAgd2l0aCBwcm9wZXIgZXJyb3IgaGFuZGxpbmdcclxuICAgIERCSGVscGVyLmZldGNoUmVzdGF1cmFudHMoKGVycm9yLCByZXN0YXVyYW50cykgPT4ge1xyXG4gICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICBjYWxsYmFjayhlcnJvciwgbnVsbCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gRmlsdGVyIHJlc3RhdXJhbnRzIHRvIGhhdmUgb25seSBnaXZlbiBjdWlzaW5lIHR5cGVcclxuICAgICAgICBjb25zdCByZXN1bHRzID0gcmVzdGF1cmFudHMuZmlsdGVyKHIgPT4gci5jdWlzaW5lX3R5cGUgPT0gY3Vpc2luZSk7XHJcbiAgICAgICAgY2FsbGJhY2sobnVsbCwgcmVzdWx0cyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRmV0Y2ggcmVzdGF1cmFudHMgYnkgYSBuZWlnaGJvcmhvb2Qgd2l0aCBwcm9wZXIgZXJyb3IgaGFuZGxpbmcuXHJcbiAgICovXHJcbiAgc3RhdGljIGZldGNoUmVzdGF1cmFudEJ5TmVpZ2hib3Job29kKG5laWdoYm9yaG9vZCwgY2FsbGJhY2spIHtcclxuICAgIC8vIEZldGNoIGFsbCByZXN0YXVyYW50c1xyXG4gICAgREJIZWxwZXIuZmV0Y2hSZXN0YXVyYW50cygoZXJyb3IsIHJlc3RhdXJhbnRzKSA9PiB7XHJcbiAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgIGNhbGxiYWNrKGVycm9yLCBudWxsKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBGaWx0ZXIgcmVzdGF1cmFudHMgdG8gaGF2ZSBvbmx5IGdpdmVuIG5laWdoYm9yaG9vZFxyXG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSByZXN0YXVyYW50cy5maWx0ZXIociA9PiByLm5laWdoYm9yaG9vZCA9PSBuZWlnaGJvcmhvb2QpO1xyXG4gICAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3VsdHMpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZldGNoIHJlc3RhdXJhbnRzIGJ5IGEgY3Vpc2luZSBhbmQgYSBuZWlnaGJvcmhvb2Qgd2l0aCBwcm9wZXIgZXJyb3IgaGFuZGxpbmcuXHJcbiAgICovXHJcbiAgc3RhdGljIGZldGNoUmVzdGF1cmFudEJ5Q3Vpc2luZUFuZE5laWdoYm9yaG9vZChjdWlzaW5lLCBuZWlnaGJvcmhvb2QsIGNhbGxiYWNrKSB7XHJcbiAgICAvLyBGZXRjaCBhbGwgcmVzdGF1cmFudHNcclxuICAgIERCSGVscGVyLmZldGNoUmVzdGF1cmFudHMoKGVycm9yLCByZXN0YXVyYW50cykgPT4ge1xyXG4gICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICBjYWxsYmFjayhlcnJvciwgbnVsbCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdHMgPSByZXN0YXVyYW50c1xyXG4gICAgICAgIGlmIChjdWlzaW5lICE9ICdhbGwnKSB7IC8vIGZpbHRlciBieSBjdWlzaW5lXHJcbiAgICAgICAgICByZXN1bHRzID0gcmVzdWx0cy5maWx0ZXIociA9PiByLmN1aXNpbmVfdHlwZSA9PSBjdWlzaW5lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5laWdoYm9yaG9vZCAhPSAnYWxsJykgeyAvLyBmaWx0ZXIgYnkgbmVpZ2hib3Job29kXHJcbiAgICAgICAgICByZXN1bHRzID0gcmVzdWx0cy5maWx0ZXIociA9PiByLm5laWdoYm9yaG9vZCA9PSBuZWlnaGJvcmhvb2QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYWxsYmFjayhudWxsLCByZXN1bHRzKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGZXRjaCBhbGwgbmVpZ2hib3Job29kcyB3aXRoIHByb3BlciBlcnJvciBoYW5kbGluZy5cclxuICAgKi9cclxuICBzdGF0aWMgZmV0Y2hOZWlnaGJvcmhvb2RzKGNhbGxiYWNrKSB7XHJcbiAgICAvLyBGZXRjaCBhbGwgcmVzdGF1cmFudHNcclxuICAgIERCSGVscGVyLmZldGNoUmVzdGF1cmFudHMoKGVycm9yLCByZXN0YXVyYW50cykgPT4ge1xyXG4gICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICBjYWxsYmFjayhlcnJvciwgbnVsbCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gR2V0IGFsbCBuZWlnaGJvcmhvb2RzIGZyb20gYWxsIHJlc3RhdXJhbnRzXHJcbiAgICAgICAgY29uc3QgbmVpZ2hib3Job29kcyA9IHJlc3RhdXJhbnRzLm1hcCgodiwgaSkgPT4gcmVzdGF1cmFudHNbaV0ubmVpZ2hib3Job29kKVxyXG4gICAgICAgIC8vIFJlbW92ZSBkdXBsaWNhdGVzIGZyb20gbmVpZ2hib3Job29kc1xyXG4gICAgICAgIGNvbnN0IHVuaXF1ZU5laWdoYm9yaG9vZHMgPSBuZWlnaGJvcmhvb2RzLmZpbHRlcigodiwgaSkgPT4gbmVpZ2hib3Job29kcy5pbmRleE9mKHYpID09IGkpXHJcbiAgICAgICAgY2FsbGJhY2sobnVsbCwgdW5pcXVlTmVpZ2hib3Job29kcyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRmV0Y2ggYWxsIGN1aXNpbmVzIHdpdGggcHJvcGVyIGVycm9yIGhhbmRsaW5nLlxyXG4gICAqL1xyXG4gIHN0YXRpYyBmZXRjaEN1aXNpbmVzKGNhbGxiYWNrKSB7XHJcbiAgICAvLyBGZXRjaCBhbGwgcmVzdGF1cmFudHNcclxuICAgIERCSGVscGVyLmZldGNoUmVzdGF1cmFudHMoKGVycm9yLCByZXN0YXVyYW50cykgPT4ge1xyXG4gICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICBjYWxsYmFjayhlcnJvciwgbnVsbCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gR2V0IGFsbCBjdWlzaW5lcyBmcm9tIGFsbCByZXN0YXVyYW50c1xyXG4gICAgICAgIGNvbnN0IGN1aXNpbmVzID0gcmVzdGF1cmFudHMubWFwKCh2LCBpKSA9PiByZXN0YXVyYW50c1tpXS5jdWlzaW5lX3R5cGUpXHJcbiAgICAgICAgLy8gUmVtb3ZlIGR1cGxpY2F0ZXMgZnJvbSBjdWlzaW5lc1xyXG4gICAgICAgIGNvbnN0IHVuaXF1ZUN1aXNpbmVzID0gY3Vpc2luZXMuZmlsdGVyKCh2LCBpKSA9PiBjdWlzaW5lcy5pbmRleE9mKHYpID09IGkpXHJcbiAgICAgICAgY2FsbGJhY2sobnVsbCwgdW5pcXVlQ3Vpc2luZXMpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBSZXN0YXVyYW50IHBhZ2UgVVJMLlxyXG4gICAqL1xyXG4gIHN0YXRpYyB1cmxGb3JSZXN0YXVyYW50KHJlc3RhdXJhbnQpIHtcclxuICAgIHJldHVybiAoYC4vcmVzdGF1cmFudC5odG1sP2lkPSR7cmVzdGF1cmFudC5pZH1gKTtcclxuICAgIC8vIGNvbnN0IHVybCA9ICdodHRwczovL2RpbmRlcmEuZ2l0aHViLmlvL3Jlc3RhdXJhbnQtcmV2aWV3LWFwcC8nO1xyXG4gICAgLy8gcmV0dXJuIChgL3Jlc3RhdXJhbnRzLyR7cmVzdGF1cmFudC5pZH1gKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlc3RhdXJhbnQgaW1hZ2UgVVJMLlxyXG4gICAqL1xyXG4gIHN0YXRpYyBpbWFnZVVybEZvclJlc3RhdXJhbnQocmVzdGF1cmFudCkge1xyXG4gICAgcmV0dXJuIChgL3NyYy9pbWcvJHtyZXN0YXVyYW50LmlkfS0zMDBfc21hbGwuanBnYCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqICBJbWFnZSBTcmNzZXQgZm9yIEluZGV4IHBhZ2UuXHJcbiAgKi9cclxuICBzdGF0aWMgaW1hZ2VTcmNzZXRGb3JJbmRleChyZXN0YXVyYW50KSB7XHJcbiAgICByZXR1cm4gKGBzcmMvaW1hZ2VzLyR7cmVzdGF1cmFudC5pZH0tMzAwX3NtYWxsLmpwZyAxeCwgc3JjL2ltYWdlcy8ke3Jlc3RhdXJhbnQuaWR9LTYwMF9tZWRpdW1fMnguanBnIDJ4YCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqICBJbWFnZSBTcmNzZXQgZm9yIFJlc3RhdXJhbnQgcGFnZS5cclxuICAqL1xyXG4gIHN0YXRpYyBpbWFnZVNyY3NldEZvclJlc3RhdXJhbnQocmVzdGF1cmFudCkge1xyXG4gICAgcmV0dXJuIChgc3JjL2ltYWdlcy8ke3Jlc3RhdXJhbnQuaWR9LTMwMF9zbWFsbC5qcGcgMzAwdywgc3JjL2ltYWdlcy8ke3Jlc3RhdXJhbnQuaWR9LTYwMF9tZWRpdW1fMnguanBnIDYwMHcsIHNyYy9pbWFnZXMvJHtyZXN0YXVyYW50LmlkfS04MDBfbGFyZ2VfMnguanBnIDgwMHdgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogR2V0IEZhdm9yaXRlIHJlc3RhdXJhbnRzXHJcbiAgKiAvKlxyXG4qIE1hcmsgZmF2b3JpdGUgcmVzdGF1cmFudCBhbmQgYWRkIHRvIGZhdm9yaXRlIGRhdGFiYXNlIGFuZCByZXN0YXVyYW50IGRhdGFiYXNlXHJcbiogR2V0IHRoZSBmYXZvcml0ZXMgd2hlbiBvZmZsaW5lIGZyb20gcmVzdGF1cm50IGRhdGFic2UgXHJcbiogcHV0IGZhdm9yaXRlIHdoZW4gb2ZmbGluZSB0byBkYXRhYmFzZVxyXG4qIHNlbmQgZmF2b3JpdGVzIHRvIHNlcnZlciBmcm9tIGRhdGFiYXNlIHdoZW4gY29ubmVjdGVkIHRvIG5ldHdvcmtcclxuXHJcbiovXHJcblxyXG4gIHN0YXRpYyBzYXZlRmF2b3JpdGUoaWQsIGlzZmF2b3JpdGUsKSB7XHJcblxyXG4gIGNvbnN0IHVybCA9IGAke0RCSGVscGVyLkRBVEFCQVNFX1VSTH0vcmVzdGF1cmFudHMvJHtpZH0vP2lzX2Zhdm9yaXRlPSR7aXNmYXZvcml0ZX1gXHJcbiAgICAgXHJcbiAgICAvL0RCSGVscGVyLmFkZFBlbmRpbmdPZmZsaW5lKHVybCwgbWV0aG9kKVxyXG4gICAgREJIZWxwZXIuZmV0Y2hSZXN0YXVyYW50QnlJZChpZCwgKGVycm9yLCByZXN0YXVyYW50KSA9PiB7XHJcbiAgICAgIGlmKGVycm9yKSByZXR1cm47XHJcbiAgICAgIHJlc3RhdXJhbnQuaXNfZmF2b3JpdGUgPSBpc2Zhdm9yaXRlO1xyXG4gICAgICBjb25zb2xlLmxvZyhpc2Zhdm9yaXRlKTtcclxuICAgICAgZGJQcm9taXNlLnRoZW4oZGIgPT4ge1xyXG4gICAgICAgIGNvbnN0IHR4ID0gZGIudHJhbnNhY3Rpb24oJ3Jlc3RhdXJhbnQtc3RvcmUnLCAncmVhZHdyaXRlJyk7XHJcbiAgICAgICAgY29uc3QgcmVzdGF1cmFudFN0b3JlID0gdHgub2JqZWN0U3RvcmUoJ3Jlc3RhdXJhbnQtc3RvcmUnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh1cmwpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJlc3RhdXJhbnRTdG9yZS5wdXQocmVzdGF1cmFudCkudGhlbihpZCA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyh0eCk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhpc2Zhdm9yaXRlKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHVybCk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXN0YXVyYW50LmlzX2Zhdm9yaXRlKTtcclxuICAgICAgICAgIGZldGNoKHVybCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQVVQnXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0eC5jb21wbGV0ZSAmJiByZXN0YXVyYW50O1xyXG4gICAgICB9KS5jYXRjaCgoY2FsbGJhY2spPT4ge1xyXG4gICAgICBcclxuICAgICAgICBEQkhlbHBlci5mZXRjaFJlc3RhdXJhbnRzKGNhbGxiYWNrID0+IHtcclxuICAgICAgIHJldHVybiBkYlByb21pc2UudGhlbihkYiA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHR4ID0gZGIudHJhbnNhY3Rpb24oJ3Jlc3RhdXJhbnQtc3RvcmUnLCAncmVhZHdyaXRlJyk7XHJcbiAgICAgICBcclxuICAgICAgICAgICAgY29uc3QgcmVzdGF1cmFudFN0b3JlID0gdHgub2JqZWN0U3RvcmUoJ3Jlc3RhdXJhbnQtc3RvcmUnKTtcclxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSByZXN0YXVyYW50U3RvcmUuaW5kZXgoJ3Jlc3RhdXJhbnRJbmRleCcsICdyZWFkd3JpdGUnKTtcclxuICAgICAgICAgICAgY29uc3QgZmF2cyA9ICBpbmRleC5nZXRBbGwoJ2lzX2Zhdm9yaXRlJyk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG51bGwsIGZhdnMpOyBcclxuICAgICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgZmF2cyk7XHJcbiAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pOyBcclxuICAgICAgY29uc29sZS5sb2cocmVzdGF1cmFudC5pc19mYXZvcml0ZSk7XHJcbiAgICAgIHJldHVybiByZXN0YXVyYW50LmlzX2Zhdm9yaXRlO1xyXG4gICAgfSlcclxuICB9XHJcbiBcclxuKX1cclxuXHJcbiAgLyoqXHJcbiAgICogTWFwIG1hcmtlciBmb3IgYSByZXN0YXVyYW50LlxyXG4gICAqL1xyXG4gIHN0YXRpYyBtYXBNYXJrZXJGb3JSZXN0YXVyYW50KHJlc3RhdXJhbnQsIG1hcCkge1xyXG4gICAgLy8gaHR0cHM6Ly9sZWFmbGV0anMuY29tL3JlZmVyZW5jZS0xLjMuMC5odG1sI21hcmtlciAgXHJcbiAgICBjb25zdCBtYXJrZXIgPSBuZXcgTC5tYXJrZXIoW3Jlc3RhdXJhbnQubGF0bG5nLmxhdCwgcmVzdGF1cmFudC5sYXRsbmcubG5nXSxcclxuICAgICAge1xyXG4gICAgICAgIHRpdGxlOiByZXN0YXVyYW50Lm5hbWUsXHJcbiAgICAgICAgYWx0OiByZXN0YXVyYW50Lm5hbWUsXHJcbiAgICAgICAgdXJsOiBEQkhlbHBlci51cmxGb3JSZXN0YXVyYW50KHJlc3RhdXJhbnQpXHJcbiAgICAgIH0pXHJcbiAgICBtYXJrZXIuYWRkVG8obmV3TWFwKTtcclxuICAgIHJldHVybiBtYXJrZXI7XHJcbiAgfVxyXG5cclxuICAvKiBzdGF0aWMgbWFwTWFya2VyRm9yUmVzdGF1cmFudChyZXN0YXVyYW50LCBtYXApIHtcclxuICAgIGNvbnN0IG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICBwb3NpdGlvbjogcmVzdGF1cmFudC5sYXRsbmcsXHJcbiAgICAgIHRpdGxlOiByZXN0YXVyYW50Lm5hbWUsXHJcbiAgICAgIHVybDogREJIZWxwZXIudXJsRm9yUmVzdGF1cmFudChyZXN0YXVyYW50KSxcclxuICAgICAgbWFwOiBtYXAsXHJcbiAgICAgIGFuaW1hdGlvbjogZ29vZ2xlLm1hcHMuQW5pbWF0aW9uLkRST1B9XHJcbiAgICApO1xyXG4gICAgcmV0dXJuIG1hcmtlcjtcclxuICB9ICovXHJcblxyXG59XHJcblxyXG4iXX0=
