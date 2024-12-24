// Ініціалізація мапи
var map = new ol.Map({
    target: 'map',
    layers: [
        // Базовий шар OpenStreetMap
        new ol.layer.Tile({
            source: new ol.source.OSM(),
            title: 'OpenStreetMap',
            type: 'base'
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([24.0159, 48.6745]), // Центруємо карту на Карпатах
        zoom: 8 // Початковий масштаб
    })
});

// Шар космознімків
var maptilerSat = new ol.layer.Tile({
	source: new ol.source.TileJSON({
		attributions: '@MapTiler',
		url:'https://api.maptiler.com/maps/hybrid/tiles.json?key=TFKdeOvGV7ErM3vHABki'
	}),
	title: 'Космознімки',
})

map.addLayer(maptilerSat)

// Функція для створення векторного шару з GeoJSON
function createGeoJsonLayer(url, title, strokeColor, fillColor) {
    return new ol.layer.Vector({
        source: new ol.source.Vector({
            url: url,
            format: new ol.format.GeoJSON(),
        }),
        title: title,
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: strokeColor,
                width: 2,
            }),
            fill: new ol.style.Fill({
                color: fillColor,
            }),
        })
    });
}

// Додавання векторних шарів з туристичними маршрутами
map.addLayer(createGeoJsonLayer('layers/Homyak, Cyniak, Guk.geojson', 'Маршрут: Хом’як, Синяк та Гук', 'green', 'rgba(0, 128, 0, 0.3)'));
map.addLayer(createGeoJsonLayer('layers/Karpaty Trail.geojson', 'Карпатський національний природний парк', 'blue', 'rgba(0, 0, 255, 0.2)'));
map.addLayer(createGeoJsonLayer('layers/Krasna Ridge from Ust Chernaya to Kolochava.geojson', 'Красна хребет', 'brown', 'rgba(165, 42, 42, 0.2)'));
map.addLayer(createGeoJsonLayer('layers/Mount Hoverla.geojson', 'Гора Говерла', 'red', 'rgba(255, 0, 0, 0.3)'));
map.addLayer(createGeoJsonLayer('layers/Mount Parashka.geojson', 'Гора Парашка', 'purple', 'rgba(128, 0, 128, 0.3)'));
map.addLayer(createGeoJsonLayer('layers/Mount Pikui Loop.geojson', 'Гора Пікуй', 'orange', 'rgba(255, 165, 0, 0.3)'));
map.addLayer(createGeoJsonLayer('layers/Pip Ivan.geojson', 'Піп Іван Чорногірський', 'darkgreen', 'rgba(0, 100, 0, 0.3)'));
map.addLayer(createGeoJsonLayer('layers/Połonina Borzawa.geojson', 'Полонина Боржава', 'cyan', 'rgba(0, 255, 255, 0.3)'));

// Панель для перемикання шарів
var layerSwitcher = new ol.control.LayerSwitcher({
    activationMode: 'click',
    startActive: false,
    tipLabel: 'Перемикання шарів',
    groupSelectStyle: 'group'
});
map.addControl(layerSwitcher);

// Залежність видимості шарів від масштабу
map.getView().on('change:resolution', function () {
    var currentZoom = map.getView().getZoom();
    map.getLayers().forEach(function (layer) {
        if (layer instanceof ol.layer.Vector) {
            layer.setVisible(currentZoom > 7); // Векторні шари показуються лише при збільшенні
        }
    });
});
