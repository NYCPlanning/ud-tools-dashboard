import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Map, View, MapEvent} from 'ol';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {Vector as VectorSource, Stamen, OSM, XYZ} from 'ol/source';
import {fromLonLat} from 'ol/proj';
import {register} from 'ol/proj/proj4';
import {WKT} from 'ol/format';
import {Draw} from 'ol/interaction';
import 'ol/ol.css';
import proj4 from 'proj4';

class MapPanel extends Component {

    constructor(props) {
        super(props);
        this.mapTarget = React.createRef();
    };

    static propTypes = {
        onSubmitMessage: PropTypes.func.isRequired
    }

    state = {
        message: ''
    }

    componentDidMount() {

        proj4.defs("EPSG:2263","+proj=lcc +lat_1=41.03333333333333 +lat_2=40.66666666666666 +lat_0=40.16666666666666 +lon_0=-74 +x_0=300000.0000000001 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=us-ft +no_defs");
        register(proj4);
    
        var rasterLayer = new TileLayer({source: new Stamen({layer: 'toner'})});
        var source = new VectorSource({wrapX: false});
        var vectorLayer = new VectorLayer({source: source});
        var draw; // global so we can remove it later
        var format = new WKT(); // formatter to make wkt strings
    
        var map = new Map({
          target: this.mapTarget.current,
          layers: [rasterLayer, vectorLayer],
          view: new View({
            center: fromLonLat([-74.010476, 40.708245]),
            zoom: 16
          })
        });
    
        //var typeSelect = document.getElementById('type');
    
        function addInteraction(t) {
          var value = "Polygon"; // typeSelect.value
          if (value !== 'None') {
            draw = new Draw({
              source: source,
              type: value
            });
            
            draw.on('drawend', function(e) {
              var feature = e.feature.clone();
              var featureGeom = feature.getGeometry();
    
              //transform it (in place?)
              featureGeom.transform('EPSG:3857', 'EPSG:2263');
    
              var wktText = format.writeFeature(feature);
              console.log(wktText);
              // here's where you would define the "send" event
              
              t.setState({ message: wktText})
              t.props.onSubmitMessage(t.state.message)
              //send(wktText);
            });
    
            map.addInteraction(draw);
          }
        }
        
        addInteraction(this);

        // save map and layer references to local state
        // this.setState({ 
        //     map: map,
        //     featuresLayer: featuresLayer
        // });

    }

    componentDidUpdate() {

    }

    render() {
        return (
            <div id="mapTarget" ref={this.mapTarget}></div>
        );
    }
}

export default MapPanel;
