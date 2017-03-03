/*
 * L.Control.ZoomDisplay shows the current map zoom level
 */
L.Control.ZoomDisplay = L.Control.extend({
    options: {
        position: 'topright'
    },

    onAdd: function (map) {
        this._map = map;
        this._container = L.DomUtil.create('div', 'leaflet-control-zoom-display leaflet-bar-part leaflet-bar');
        this.updateMapZoom(map.getZoom());
        map.on('zoomend', this.onMapZoomEnd, this);
        return this._container;
    },

    onRemove: function (map) {
        map.off('zoomend', this.onMapZoomEnd, this);
    },

    onMapZoomEnd: function (e) {
        this.updateMapZoom(this._map.getZoom());
    },

    updateMapZoom: function (zoom) {
        this._container.innerHTML = 'Zoom Level '+zoom;
        /*
         var m =L.control.magnifyingglass(magnifyingGlass, { forceSeparateButton: true});
                 if (zoom<=15){
                    // m.addTo(map);
                 }else{
                     
                     //map.removeControl(m);
                 }
         */
        
    }
    
});

L.Map.mergeOptions({
    zoomDisplayControl: true
});

L.Map.addInitHook(function () {
    if (this.options.zoomDisplayControl) {
        this.zoomDisplayControl = new L.Control.ZoomDisplay();
        this.addControl(this.zoomDisplayControl);
    }
});

L.control.zoomDisplay = function (options) {
    return new L.Control.ZoomDisplay(options);
};