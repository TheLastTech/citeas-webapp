angular.module('app', [

    // external libs
    'ngRoute',
    'ngMessages',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngMaterial',
    'ngProgress',

    // this is how it accesses the cached templates in ti.js
    'templates.app',

    // services
    'numFormat',

    // pages
    "landing",
    "citePage"

]);




angular.module('app').config(function ($routeProvider,
                                       $mdThemingProvider,
                                       $locationProvider) {
    $locationProvider.html5Mode(true);
    $mdThemingProvider.theme('default')
        .primaryPalette('deep-orange')
        .accentPalette("blue")



});


angular.module('app').run(function($route,
                                   $rootScope,
                                   $q,
                                   $timeout,
                                   $cookies,

                                   $http,
                                   $location) {

    //
    //(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    //        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    //    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    //})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    //ga('create', 'UA-23384030-1', 'auto');




    $rootScope.$on('$routeChangeStart', function(next, current){
    })
    $rootScope.$on('$routeChangeSuccess', function(next, current){
        //window.scrollTo(0, 0)
        //ga('send', 'pageview', { page: $location.url() });

    })



    $rootScope.$on('$routeChangeError', function(event, current, previous, rejection){
        console.log("$routeChangeError! here's some things to look at: ", event, current, previous, rejection)

        $location.url("page-not-found")
        window.scrollTo(0, 0)
    });
});



angular.module('app').controller('AppCtrl', function(
    ngProgressFactory,
    $rootScope,
    $scope,
    $route,
    $location,
    NumFormat,
    $http,
    $mdDialog,
    $sce){

    var progressBarInstance = ngProgressFactory.createInstance();

    $rootScope.progressbar = progressBarInstance
    $scope.progressbar = progressBarInstance
    $scope.numFormat = NumFormat
    $scope.moment = moment // this will break unless moment.js loads over network...

    $scope.global = {}

    $scope.pageTitle = function(){
        if (!$scope.global.title){
            $scope.global.title = "credit for all the things!"
        }
        return "CiteAs: " + $scope.global.title
    }


    $scope.productMetadata = {}
    $scope.setCitationMetaTags = function(metadata){

        console.log("setting product metadata", metadata)

        $scope.productMetadata = metadata

        // force Zotero to check the page for metadata
        var ev = document.createEvent('HTMLEvents');
        ev.initEvent('ZoteroItemUpdated', true, true);
        document.dispatchEvent(ev);
    }




    $rootScope.$on('$routeChangeSuccess', function(next, current){
        $scope.global.template = current.loadedTemplateUrl
            .replace("/", "-")
            .replace(".tpl.html", "")
        $scope.global.title = null
    })

    $scope.trustHtml = function(str){
        return $sce.trustAsHtml(str)
    }

    var showAlert = function(msgText, titleText, okText){
        if (!okText){
            okText = "ok"
        }
          $mdDialog.show(
                  $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title(titleText)
                    .textContent(msgText)
                    .ok(okText)
            );
    }
    $rootScope.showAlert = showAlert
})





// from https://stackoverflow.com/a/34503498/226013
function copyText(element) {
    //Before we copy, we are going to select the text.
    var text = document.getElementById(element);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
    selection.removeAllRanges();

}












var stubbedResp =
{
  "citations": [
    {
      "citation": "Wickham, H., & RStudio.  (n.d.). stringr: Simple, Consistent Wrappers for Common String Operations. <i>R package version 1.2.0.9000</i>. Retrieved from https://CRAN.R-project.org/package=stringr",
      "style_fullname": "American Psychological Association 6th edition",
      "style_shortname": "apa"
    },
    {
      "citation": "Wickham, H. & RStudio, stringr: Simple, Consistent Wrappers for Common String Operations. <i>R package version 1.2.0.9000</i>. Available at: https://CRAN.R-project.org/package=stringr.",
      "style_fullname": "Harvard Reference format 1 (author-date)",
      "style_shortname": "harvard1"
    },
    {
      "citation": "1.Wickham, H. & RStudio. stringr: Simple, Consistent Wrappers for Common String Operations. <i>R package version 1.2.0.9000</i>",
      "style_fullname": "Nature",
      "style_shortname": "nature"
    },
    {
      "citation": "Wickham, Hadley, and RStudio. \u201cStringr: Simple, Consistent Wrappers for Common String Operations\u201d. <i>R package version 1.2.0.9000</i>. Web. <https://CRAN.R-project.org/package=stringr>...",
      "style_fullname": "Modern Language Association 7th edition (with URL)",
      "style_shortname": "modern-language-association-with-url"
    },
    {
      "citation": "Wickham, Hadley, and RStudio. n.d.. \u201cStringr: Simple, Consistent Wrappers for Common String Operations\u201d. <i>R Package Version 1.2.0.9000</i>. https://CRAN.R-project.org/package=stringr.",
      "style_fullname": "Chicago Manual of Style 16th edition (author-date)",
      "style_shortname": "chicago-author-date"
    },
    {
      "citation": "1. Wickham H, RStudio. stringr: Simple, Consistent Wrappers for Common String Operations [Internet]. R package version 1.2.0.9000.. Available from: https://CRAN.R-project.org/package=stringr",
      "style_fullname": "Vancouver",
      "style_shortname": "vancouver"
    }
  ],
  "doi": null,
  "exports": [
    {
      "export": "container-title,URL,type,title,note,year,id,author\nR package version 1.2.0.9000,https://CRAN.R-project.org/package=stringr,Manual,stringr: Simple, Consistent Wrappers for Common String Operations,R package version 1.2.0.9000,2017,ITEM-1,[{'suffix': u'', 'given': u'Hadley', 'family': u'Wickham'}, {'family': u'RStudio'}]",
      "export_name": "csv"
    },
    {
      "export": "%T stringr: Simple, Consistent Wrappers for Common String Operations\n%J R package version 1.2.0.9000\n%V \n%N \n%P \n%D 2009\n%I \n%A Wickham, Hadley\n%A RStudio, ",
      "export_name": "enw"
    },
    {
      "export": "T1 stringr: Simple, Consistent Wrappers for Common String Operations\nJO R package version 1.2.0.9000\nVL \nIS \nSP \nV1 2009\nPB \nA1 Wickham, Hadley\nA1 RStudio, ",
      "export_name": "ris"
    },
    {
      "export": "@article{piwowar2007sharing,\n              title={Sharing detailed research data is associated with increased citation rate},\n              author={Piwowar, Heather A and Day, Roger S and Fridsma, Douglas B},\n              journal={PloS one},\n              volume={2},\n              number={3},\n              pages={e308},\n              year={2007},\n              publisher={Public Library of Science}\n            }\n            ",
      "export_name": "bibtex"
    }
  ],
  "metadata": {
    "URL": "https://CRAN.R-project.org/package=stringr",
    "author": [
      {
        "family": "Wickham",
        "given": "Hadley",
        "suffix": ""
      },
      {
        "family": "RStudio"
      }
    ],
    "container-title": "R package version 1.2.0.9000",
    "id": "ITEM-1",
    "note": "R package version 1.2.0.9000",
    "title": "stringr: Simple, Consistent Wrappers for Common String Operations",
    "type": "Manual",
    "year": "2017"
  },
  "name": "stringr: Simple, Consistent Wrappers for Common String Operations",
  "provenance": [
    {
      "context": "base library url",
      "location": "http://api.citeas.org/product/https://cran.r-project.org/web/packages/stringr",
      "source_type": "request parameters"
    },
    {
      "context": "GitHub URL",
      "location": "http://cran.r-project.org/web/packages/stringr",
      "source_type": "webpage content"
    },
    {
      "context": "GitHub DESCRIPTION file",
      "location": "https://github.com/tidyverse/stringr/raw/master/DESCRIPTION",
      "source_type": "DESCRIPTION metadata"
    }
  ],
  "url": "https://github.com/tidyverse/stringr"
}


angular.module('citePage', [
    'ngRoute',
    'ngMessages'
])

    .config(function ($routeProvider) {
        $routeProvider.when('/cite/:projectId*', {
            templateUrl: "cite-page.tpl.html",
            controller: "CitePageCtrl"
        })
    })






    .controller("CitePageCtrl", function ($scope, $mdDialog, $mdToast, $routeParams, $http) {

        // define stuff
        var apiResp
        var url = "http://api.citeas.org/product/" + $routeParams.projectId
        $scope.apiUrl = url
        $scope.apiResp = "loading"
        $scope.user = {}

        // load the data from the API
        load()

        // just for testing
        //onDataLoad(stubbedResp)


        // call once the API has returned a good response
        function onDataLoad(resp) {
            apiResp = resp
            $scope.apiResp = apiResp
            $scope.user.selectedCitation = resp.citations[0]
            $scope.setCitationMetaTags(apiResp.metadata)

        }

        function load(){
            $http.get(url).success(function(resp){
                console.log("response from api yay", resp)
                onDataLoad(resp)
            }).error(function(resp){
                console.log("bad response from api", resp)
                $scope.apiResp = "error"
            })

        }

        $scope.copy = function(){
            copyText("citation")
            var toast = $mdToast.simple()
                  .textContent('Copied to clipboard')
                  .action('OK')

            $mdToast.show(toast)
        }

        var originatorEv;
        $scope.openMenu = function($mdOpenMenu, ev){
            originatorEv = ev;
            console.log("open menu")
            $mdOpenMenu(ev);
        }

        $scope.modify = function(){
            console.log("modify!")
            $mdDialog.show(
                $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title("Are you the owner of this software project?")
                    .textContent("If so, you can modify this citation by editing metadata associated with the project.")
                    .ok("Learn how")

            )
        }


        $scope.saveAs = function(format){
            var extensions = {
                endnote: "enw",
                refworks: "ris",
                bibtex: "bibtex"
            }

            var myExt = extensions[format]
            var myExportObj = apiResp.exports.find(function(expObj){
                return expObj.export_name == myExt
            })

            console.log("export obj", myExportObj)

            var filename = "citation." + myExportObj.export_name
            var fileMime = "text/" + format

            // using external download.js library
            download(myExportObj.export, filename, fileMime)
        }

    })











angular.module('landing', [
    'ngRoute',
    'ngMessages'
])

    .config(function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: "landing.tpl.html",
            controller: "LandingPageCtrl"
        })
    })

    .config(function ($routeProvider) {
        $routeProvider.when('/landing/:landingPageName', {
            templateUrl: "landing.tpl.html",
            controller: "LandingPageCtrl"
        })
    })
    .config(function ($routeProvider) {
        $routeProvider.when('/about', {
            templateUrl: "about.tpl.html"
        })
    })
    .config(function ($routeProvider) {
        $routeProvider.when('/api', {
            templateUrl: "api.tpl.html"
        })
    })




    .config(function ($routeProvider) {
        $routeProvider.when('/page-not-found', {
            templateUrl: "page-not-found.tpl.html",
            controller: "PageNotFoundCtrl"
        })
    })

    .controller("PageNotFoundCtrl", function($scope){
        console.log("PageNotFound controller is running!")

    })



    .controller("LandingPageCtrl", function ($scope,
                                             $location,
                                             $timeout) {

        $scope.main = {}

        console.log("i am the landing page ctrl")
        $scope.submit = function(){
            console.log("submit!", $scope.main.id)
            $location.path("/cite/" + $scope.main.id)
        }

    })











angular.module("numFormat", [])

    .factory("NumFormat", function($location){

        var commas = function(x) { // from stackoverflow
            if (!x) {
                return x
            }
            var parts = x.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return parts.join(".");
        }


        var short = function(num, fixedAt){
            if (typeof num === "string"){
                return num  // not really a number
            }

            // from http://stackoverflow.com/a/14994860/226013
            if (num === null){
                return 0
            }
            if (num === 0){
                return 0
            }

            if (num >= 1000000) {
                return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
            }
            if (num >= 100000) { // no decimal if greater than 100thou
                return (num / 1000).toFixed(0).replace(/\.0$/, '') + 'k';
            }

            if (num >= 1000) {
                return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
            }


            if (num < 1) {
                return Math.round(num * 100) / 100;  // to two decimals
            }

            return Math.ceil(num);
        }

        var round = function(num){
            return Math.round(num)
        }

        var doubleUrlEncode = function(str){
            return encodeURIComponent( encodeURIComponent(str) )
        }

        // from http://cwestblog.com/2012/09/28/javascript-number-getordinalfor/
        var ordinal = function(n) {
            n = Math.round(n)
            var s=["th","st","nd","rd"],
                v=n%100;
            return n+(s[(v-20)%10]||s[v]||s[0]);
        }

        var decimalToPerc = function(decimal, asOrdinal){
            var ret = Math.round(decimal * 100)
            if (asOrdinal){
                ret = ordinal(ret)
            }
            return ret
        }
        return {
            short: short,
            commas: commas,
            round: round,
            ordinal: ordinal,
            doubleUrlEncode: doubleUrlEncode,
            decimalToPerc: decimalToPerc

        }
    });
angular.module('templates.app', ['about.tpl.html', 'api.tpl.html', 'cite-page.tpl.html', 'landing.tpl.html', 'page-not-found.tpl.html']);

angular.module("about.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("about.tpl.html",
    "<div class=\"page about\" layout=\"row\" layout-align=\"center center\">\n" +
    "    <div class=\"content\">\n" +
    "        <h2>About</h2>\n" +
    "        <div class=\"text\">\n" +
    "            <p>\n" +
    "                CiteAs is a way to\n" +
    "                help get the correct citation for diverse research products,\n" +
    "                from software and datasets to preprints and articles.\n" +
    "            </p>\n" +
    "            <p>\n" +
    "                It's part of a larger grant, funded by the Alfred P. Sloan Foundation,\n" +
    "                to help scholars who share reusable\n" +
    "                research software get credit for their work.\n" +
    "            </p>\n" +
    "            <p>\n" +
    "                CiteAs is a collaboration between\n" +
    "                <a href=\"http://james.howison.name/\">James Howison</a> at the\n" +
    "                University of Texas-Austin, and\n" +
    "                <a href=\"http://impactstory.org/about\">Impactstory.</a>\n" +
    "            </p>\n" +
    "\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("api.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("api.tpl.html",
    "<div class=\"page api\" layout=\"row\" layout-align=\"center center\">\n" +
    "    <div class=\"content\">\n" +
    "        <h2>API</h2>\n" +
    "        <div class=\"text\">\n" +
    "            <p>\n" +
    "                This is where the API docs will go.\n" +
    "            </p>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("cite-page.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("cite-page.tpl.html",
    "<div class=\"page cite-page\">\n" +
    "\n" +
    "    <div class=\"content\">\n" +
    "        <div class=\"main\">\n" +
    "            <div class=\"loading\"\n" +
    "                 ng-show=\"apiResp=='loading'\">\n" +
    "                <span class=\"label\">Building your citation&hellip;</span>\n" +
    "                <md-progress-linear md-mode=\"indeterminate\"></md-progress-linear>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"error\" ng-show=\"apiResp=='error'\">\n" +
    "                <h2>Sorry!</h2>\n" +
    "                <div class=\"text\">\n" +
    "                    We weren't able to figure out a citation for this research product.\n" +
    "                    We're in active development and hopefully this particular case will\n" +
    "                    be working soon. Feel free to\n" +
    "                    <a href=\"mailto:team@impactstory.org\">let us know</a> and we'll\n" +
    "                    look into it.\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"citation animated fadeIn\" ng-show=\"apiResp.citations\">\n" +
    "                <div class=\"heading\">\n" +
    "                    <h1>\n" +
    "                        {{ apiResp.name }}\n" +
    "                    </h1>\n" +
    "                    <div class=\"metadata\">\n" +
    "                        <a href=\"{{ apiResp.url }}\"><i class=\"fa fa-external-link\"></i> view website</a>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "\n" +
    "                <div class=\"citation-options\">\n" +
    "                    <h2 class=\"label\">Cite this project as:</h2>\n" +
    "                    <md-input-container>\n" +
    "                        <md-select ng-model=\"user.selectedCitation\">\n" +
    "                            <md-option ng-repeat=\"myCitationObj in apiResp.citations\"\n" +
    "                                       ng-value=\"myCitationObj\">\n" +
    "                            {{ myCitationObj.style_fullname }}\n" +
    "                            </md-option>\n" +
    "                        </md-select>\n" +
    "                    </md-input-container>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "                <div id=\"citation\" class=\"text\" ng-bind-html=\"user.selectedCitation.citation\">\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"under-citation\">\n" +
    "                    <div class=\"export-options\">\n" +
    "\n" +
    "                        <md-button ng-click=\"copy()\" class=\"md-raised\">\n" +
    "                            <i class=\"fa fa-clipboard\"></i>\n" +
    "                            Copy\n" +
    "                        </md-button>\n" +
    "\n" +
    "\n" +
    "                        <md-menu>\n" +
    "                            <md-button ng-click=\"openMenu($mdOpenMenu, $event)\">\n" +
    "                                <i class=\"fa fa-download\"></i>\n" +
    "                                Download\n" +
    "                            </md-button>\n" +
    "\n" +
    "                            <md-menu-content width=\"4\">\n" +
    "                                <md-menu-item>\n" +
    "                                    <md-button ng-click=\"saveAs('endnote')\">\n" +
    "                                        Endnote\n" +
    "                                    </md-button>\n" +
    "                                </md-menu-item>\n" +
    "\n" +
    "                                <md-menu-item>\n" +
    "                                    <md-button ng-click=\"saveAs('refworks')\">\n" +
    "                                        Refworks\n" +
    "                                    </md-button>\n" +
    "                                </md-menu-item>\n" +
    "\n" +
    "                                <md-menu-item>\n" +
    "                                    <md-button ng-click=\"saveAs('bibtex')\">\n" +
    "                                        BibTeX\n" +
    "                                    </md-button>\n" +
    "                                </md-menu-item>\n" +
    "\n" +
    "                            </md-menu-content>\n" +
    "                        </md-menu>\n" +
    "\n" +
    "                    </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "                    <div class=\"more-actions\">\n" +
    "                        <span class=\"action modify\">\n" +
    "                            <a href=\"\" class=\"action\" ng-click=\"modify()\">\n" +
    "                                <i class=\"fa fa-pencil\"></i>\n" +
    "                                Modify\n" +
    "                            </a>\n" +
    "                        </span>\n" +
    "                        <a class=\"action\" href=\"http://api.citeas.org/product/{{ apiResp.url }}\">\n" +
    "                            <i class=\"fa fa-cog\"></i> view in API\n" +
    "                        </a>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "\n" +
    "                <div class=\"provenance\">\n" +
    "                    <h2>Citation Provenance</h2>\n" +
    "                    <div class=\"steps\">\n" +
    "                        <div class=\"step success-{{ step.has_content }}\"\n" +
    "                             ng-hide=\"(step.parent_step_name == 'UserInputStep' && !step.has_content)\"\n" +
    "                             ng-repeat=\"step in apiResp.provenance\">\n" +
    "\n" +
    "                            <div class=\"step-container\" ng-show=\"!$first && !$last\">\n" +
    "                                <div class=\"success-icon true\" ng-show=\"step.has_content\">\n" +
    "                                    <i class=\"fa fa-check\"></i>\n" +
    "                                </div>\n" +
    "                                <div class=\"success-icon false\" ng-show=\"!step.has_content\">\n" +
    "                                    <i class=\"fa fa-times\"></i>\n" +
    "                                </div>\n" +
    "\n" +
    "                                <div class=\"step-info\">\n" +
    "                                    <div class=\"intro\">\n" +
    "                                        Looking in the\n" +
    "                                        <span class=\"parent-step\">{{ step.parent_subject }},</span>\n" +
    "                                        we\n" +
    "                                        <span ng-show=\"step.has_content\">found</span>\n" +
    "                                        <span ng-show=\"!step.has_content\">didn't find</span>\n" +
    "                                        <span class=\"proxy-found\" ng-show=\"step.found_via_proxy_type=='link'\">\n" +
    "                                            a link to a\n" +
    "                                        </span>\n" +
    "                                        <span class=\"proxy-found\" ng-show=\"step.found_via_proxy_type=='doi'\">\n" +
    "                                            a DOI.\n" +
    "                                        </span>\n" +
    "                                    </div>\n" +
    "\n" +
    "                                    <div class=\"main\">\n" +
    "                                        <span class=\"name\">\n" +
    "                                            {{ step.subject }}\n" +
    "                                        </span>\n" +
    "                                        <a href=\"{{ step.more_info_url }}\" class=\"learn-more\">\n" +
    "                                            <i class=\"fa fa-question-circle\"></i>\n" +
    "                                        </a>\n" +
    "                                    </div>\n" +
    "                                    <div class=\"url\">\n" +
    "                                        <a href=\"{{ step.content_url }}\" ng-show=\"step.has_content\" class=\"learn-more\">\n" +
    "                                            {{ step.content_url }}\n" +
    "                                        </a>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <div class=\"step-container\" ng-show=\"$last\">\n" +
    "                                <div class=\"success-icon true\">\n" +
    "                                    <i class=\"fa fa-check\"></i>\n" +
    "                                </div>\n" +
    "                                <div class=\"step-info\">\n" +
    "                                    <div class=\"intro\">\n" +
    "                                        Parsing the\n" +
    "                                        <span class=\"parent-step\">{{ step.parent_subject }},</span>\n" +
    "                                        we found\n" +
    "                                    </div>\n" +
    "\n" +
    "                                    <div class=\"main\">\n" +
    "                                        <span class=\"name\">\n" +
    "                                            The citation metadata\n" +
    "                                        </span>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "\n" +
    "\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("landing.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("landing.tpl.html",
    "<div class=\"page landing\">\n" +
    "    <div class=\"top-screen\" layout=\"row\" layout-align=\"center center\">\n" +
    "        <div class=\"content\">\n" +
    "            <div class=\"tagline\">\n" +
    "                <h1>All research products deserve credit.</h1>\n" +
    "                <p class=\"subtagline\">\n" +
    "                    Get the correct citation for diverse research products,\n" +
    "                    from software and datasets to preprints and articles.\n" +
    "                </p>\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "            <div class=\"user-input\">\n" +
    "                <form class=\"input-row\" ng-submit=\"submit()\">\n" +
    "                    <md-input-container md-no-float\n" +
    "                                        class=\"md-block example-selected-{{ main.exampleSelected }}\"\n" +
    "                                        flex-gt-sm=\"\">\n" +
    "                        <label>Paste a URL or DOI</label>\n" +
    "                        <input ng-model=\"main.id\">\n" +
    "\n" +
    "                        <md-button ng-show=\"main.id\"\n" +
    "                                   ng-class=\"{fadeOut: !main.id}\"\n" +
    "                                   ng-click=\"submit()\"\n" +
    "                                   class=\"md-fab md-mini md-primary go animated fadeInRightBig\">\n" +
    "                            <i class=\"fa fa-arrow-right\"></i>\n" +
    "                        </md-button>\n" +
    "\n" +
    "                        <!--\n" +
    "                        <md-button class=\"md-raised md-primary submit\" type=\"submit\">\n" +
    "                            Get the citation\n" +
    "                        </md-button>\n" +
    "                        -->\n" +
    "                    </md-input-container>\n" +
    "                </form>\n" +
    "\n" +
    "                <div class=\"example\">\n" +
    "                    <div class=\"content\">\n" +
    "                        <div class=\"label\">Examples:</div>\n" +
    "                        <ul class=\"examples\">\n" +
    "                            <li>\n" +
    "                                <a href=\"/cite/http://yt-project.org\">http://yt-project.org</a>\n" +
    "                            </li>\n" +
    "                            <li>\n" +
    "                                <a href=\"/cite/https://cran.r-project.org/web/packages/stringr\">https://cran.r-project.org/web/packages/stringr</a>\n" +
    "                            </li>\n" +
    "                            <li>\n" +
    "                                <a href=\"/cite/10.5281/zenodo.160400\">10.5281/zenodo.160400</a>\n" +
    "                            </li>\n" +
    "                        </ul>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("page-not-found.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("page-not-found.tpl.html",
    "<div class=\"landing static-page\">\n" +
    "    <h1>Sorry, we couldn't find that page!</h1>\n" +
    "\n" +
    "</div>");
}]);
