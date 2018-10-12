const DataLoader = function (language) {
    let kaiNi = {};
    let abyssalDB = {};
    let shipDB = {};
    let shipTypes = {};
    let implications = {};
    let mstIdTable = {};
    let seasonal = {};
    let furniture = {};
    let lang = language;


    const loadShipData = function () {
        return $.getJSON((lang == "en") ? 'data/dbNew.json?v=13' : 'dbj.json?v=13', (json) => {
            shipDB = json;
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
        });
    };

    const loadAbyssalData = function () {
        return $.getJSON((lang == "en") ? 'db2.json?v=13' : 'db2j.json?v=13', (json) => {
            abyssalDB = json;
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
        });
    };

    const loadSeasonalData = function () {
        return $.getJSON("seasonal.json", (json) => {
            videoData = json;
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
        });
    };

    const loadFurnitureData = function () {
        return $.getJSON("furniture.json", (json) => {
            videoData = json;
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
        });
    };

    const loadConversionData = function () {
        return $.getJSON("conversion.json", (json) => {
            mstIdTable = json.mstId2FleetIdTable;
            implications = json.implicationTable;
            shipTypes = json.shipTypes;
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
        });
    };

    const loadKaiNiData = function () {
        return $.getJSON("./data/kaini.json", (json) => {
            kaiNi = json;
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
            $("#buttons").html("Can't find Kanmusu DB, please contact Harvestasya or Nya-chan on Github");
        });
    };

    this.initData = function (callback) {
        $.when(loadShipData(),
            loadAbyssalData(),
            loadKaiNiData(),
            loadConversionData())
            .done(callback)
            .fail(function () {
                $('#tabs').remove();
            });
    };

    this.getShips = function () { return shipDB; };
    this.getAbyssals = function () { return abyssalDB; };
    this.getSeasonals = function () { return seasonal; };
    this.getFurniture = function () { return furniture; };
    this.getMstIdTable = function () { return mstIdTable; };
    this.getShipTypes = function () { return shipTypes; };
    this.getIimplications = function () { return implications; };
    this.getKaiNiData = function () { return kaiNi; };
    this.getShipName = function (id) {
        return null;
    };
}

/*Object.assign(Loader.prototype, {
    
})*/

const TabManager = function (loader) {
    let data = loader;
    let $infoTab = $('#ttkTab');
    let $fleetTab = $('#shipTab');
    let $kainiTab = $('#shipTab');


    const loadFlagTab = function () {
        let shipDB = data.getShips();
        let i = 0;

        $.each(shipDB, function (shipType, shipClasses) {
            let s = shipType;
            $.each(shipClasses, function (shipClass, ships) {
                let a = shipClass;
                $(".div" + shipType).append('<div><label>' + shipClass.replace(new RegExp('_', 'g'), ' ') + '</label><div data-name="' + shipClass + '" class="' + shipType + '"></div></div>');
                for (let name in ships) {
                    let ship = ships[name];
                    let shipName = data.getShipName(name);

                    if (!shipName) { shipName = name; }

                    let newDiv = $('<img/>', {
                        "class": "tooltip",
                        title: name,
                        src: "icons/" + shipType + '/' + name + ".png",
                        id: "icon" + name
                    });
                    let extraSpan = $('<span/>', {
                        id: "hit" + name,
                        text: "破"
                    });
                    newDiv.on("load", function () {
                        i++;
                        $("#loadingProgress").html(i + "/" + Object.keys(shipDB).length);
                        if (i == Object.keys(shipDB).length) {
                            //doneLoading();
                            $("#loadingProgress").html("Done");
                        }
                    });

                    if (ship.seasons.length > 0) {
                        
                    }

                    if (ship.implicates.length == 0) {
                        $("#colleTab [data-name='" + shipClass + "']").append('<img title="' + shipName + '" src="icons/' + shipType + '/' + name + '.png" id="kore' + name + '" class="tooltip"></img>').append(extraSpan);
                    }
                    $("#avatars [data-name='" + shipClass + "']").append(newDiv).append(extraSpan);
                }
            })
        });

        $("#colleTab .shipClasses").each(function (i) {
            var selectClass = $("<div class='colleAll'><input id='selectAll-" + i + "' type='checkbox'/><label for='selectAll-" + i + "'>" + (lang == "jp" ? "全て選択" : (lang == "cn" || lang == "tw") ? "全選" : "Select All") + "</label></div>");
            $(this).append(selectClass);
            selectClass.find("input").on("change", function () {
                var imgs = $(this).parent().parent().find("img");
                for (var e in imgs.toArray()) {
                    var img = $(imgs[e]);
                    colle[img.attr("id").substring(4)] = this.checked;
                    img.toggleClass("selected", this.checked);
                }
                generateFunction("colleChangeAll");
            });
        });
    };

    const loadKaiNiTab = function () {
        let kaini = data.getKaiNiData();
        let shipData = data.getShips();

        for (var shipType in kaini) {
            if (Object.keys(kaini[shipType]).length == 0) {
                continue;
            }
            let $shipOptions = $kainiTab.find("#" + shipType.toLowerCase() + " .shipOptions");
            let ships = kaini[shipType];

            for (var ship in ships) {
                let currentShip = ships[ship];
                let $newDiv = $('<div/>', {

                })
                let $inputSpan = $('<span/>', {});
                let $kainiInput = $('<input/>', {
                    id: ship,
                    name: ship,
                    type: "checkbox"
                });
                let $shipLabel = $('<label/>', {
                    "for": ship,
                    //text: shipData[currentShip.base].full + " (" + currentShip.level + ")"
                    text: currentShip.base + " (" + currentShip.level + ")"
                });

                $inputSpan.append($kainiInput);
                $newDiv.append($inputSpan).append($shipLabel);

                if (currentShip.kai) $newDiv.addClass("kai");
                if (currentShip.blueprint) $newDiv.addClass("blueprint");
                if (currentShip.prototype) $newDiv.addClass("prototype");
                if (currentShip.actionReport) $newDiv.addClass("actreport");
                //if(currentShip.conversion) $newDiv.addClass("kai");
                $shipOptions.append($newDiv);
            }
        }

    };

    const loadFurnitureTab = function () {
        let furniture = data.getFurniture();

    };

    this.loadTabs = function () {
        loadFlagTab();
        loadKaiNiTab();
    }
} 