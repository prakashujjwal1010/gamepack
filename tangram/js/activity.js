// Rebase require directory
requirejs.config({
	baseUrl: "lib"
});


// Vue main app
var app = new Vue({
	el: '#app',
	components: { 'toolbar': Toolbar, 'tangramgame' : TangramGame },
	data: {

	},

	created: function() {
		requirejs(["sugar-web/activity/activity", "sugar-web/env"], function(activity, env) {
			// Initialize Sugarizer
			//activity.setup();
		});
	},

	mounted: function() {
		// Load last library from Journal
		var vm = this;
		/*requirejs(["sugar-web/activity/activity", "sugar-web/env"], function(activity, env) {
			env.getEnvironment(function(err, environment) {

					env.getEnvironment(function(err, environment) {

					});

			});
		});*/


		// Handle unfull screen buttons (b)
		document.getElementById("unfullscreen-button").addEventListener('click', function() {
			vm.unfullscreen();
		});
		window.addEventListener('resize', function () {
			vm.$refs.tangramgame.configKonva.width = window.innerWidth * 0.7;
			vm.$refs.tangramgame.configKonva.height = window.innerHeight * 0.9;

		})
	},

	updated: function() {
		if (this.currentView === EbookReader) {
			this.$refs.view.render(this.currentEpub, this.currentBook.location);
		}
	},

	methods: {

		// Handle fullscreen mode
		fullscreen: function() {
			document.getElementById("main-toolbar").style.opacity = 0;
			document.getElementById("canvas").style.top = "0px";
			document.getElementById("unfullscreen-button").style.visibility = "visible";

		},
		unfullscreen: function() {
			document.getElementById("main-toolbar").style.opacity = 1;
			document.getElementById("canvas").style.top = "55px";
			document.getElementById("unfullscreen-button").style.visibility = "hidden";

		},

		onStop: function() {
			// Save current library in Journal on Stop
			var vm = this;

			/*requirejs(["sugar-web/activity/activity"], function(activity) {
				console.log("writing...");
				var context = {

				};

				var jsonData = JSON.stringify(context);
				activity.getDatastoreObject().setDataAsText(jsonData);
				activity.getDatastoreObject().save(function(error) {
					if (error === null) {
						console.log("write done.");
					} else {
						console.log("write failed.");
					}
				});
			});*/

		}
	}
});
