using System.Web.Optimization;

namespace PlanesGame
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include("~/app/lib/jquery.js"));

            bundles.Add(new ScriptBundle("~/bundles/signalr").Include("~/app/lib/jquery.signalr.js"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include("~/app/lib/angular.js", "~/app/lib/angular-route.js"));

            bundles.Add(new ScriptBundle("~/bundles/toastr").Include("~/app/lib/toastr.js"));

            bundles.Add(new ScriptBundle("~/bundles/canvas").Include("~/app/lib/canvas.js"));
        }
    }
}