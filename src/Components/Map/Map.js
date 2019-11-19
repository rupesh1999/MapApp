import React, { Component } from 'react';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer } from '@deck.gl/layers';
import { EditableGeoJsonLayer, SelectionLayer } from '@nebula.gl/layers';
import { DrawPolygonMode } from "@nebula.gl/edit-modes";
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
// const selectedFeatureIndexes = [];



class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                width: "100%",
                height: "100%",
                latitude: 37.803273851858656,
                longitude: -122.46923446655273,
                zoom: 11,
                pitch: 0,
                bearing: 0,
                transitionDuration: 2000,
            },
            selectedFeatureIndexes: [],
            // hoveredObject: null,
        };
    }


    // _renderTooltip() {
    //     if (this.state.hoveredObject !== null) {
    //         console.log(this.state.hoveredObject.coordinate[1])
    //     }
    //     const { hoveredObject} = this.state || {};
    //     return hoveredObject && (
    //         <div style={{ position: 'absolute', zIndex: 999,  left: hoveredObject.x, top: hoveredObject.y }}>
    //             <PopupComponent info = {hoveredObject}/>
    //         </div>
    //     );
    // }

    convertHex = (hex) => {
        hex = hex.replace('#', '');
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);

        let result = [r, g, b];
        return result;
    }


    render() {
        const layer = new GeoJsonLayer({
            id: 'geojson-layer',
            data: this.props.GeoJSON,
            pickable: true,
            stroked: true,
            filled: true,
            extruded: false,
            autoHighlight: true,
            lineWidthScale: 20,
            lineWidthMinPixels: 2,
            mask: true,
            getFillColor: d => {
                console.log(d.properties.fill);
                if (d.properties.fill === undefined) {
                    return;
                } else {
                    return this.convertHex(d.properties.fill);
                }
            },
            getLineColor: d => {
                // console.log(d.properties.stroke);
                if (d.properties.stroke === undefined) {
                    return [127, 0, 255]
                } else {
                    return this.convertHex(d.properties.stroke)
                }
            },
            getRadius: 100,
            getLineWidth: d => {
                if (d.properties["stroke-width"] === undefined) {
                    return;
                } else {
                    return d.properties["stroke-width"];
                }
            },
            getFillOpacity: d=> {
                if (d.properties["fill-opacity"] === undefined) {
                    return;
                } else {
                    return d.properties["fill-opacity"];
                }
            },
            getElevation: 30,
            onClick: info => {
                console.log(info);
                this.props.setSelectedObject(info);
            }
        });

        // const selectLayer = new SelectionLayer({
        //     id: 'selection',
        //     selectionType: this.state.selectionTool,
        //     onSelect: ({ pickingInfos }) => {
        //         this.setState({ selectedFeatureIndexes: pickingInfos.map(pi => pi.index) });
        //     },
        //     layerIds: ['geojson'],

        //     getTentativeFillColor: () => [255, 0, 255, 100],
        //     getTentativeLineColor: () => [0, 0, 255, 255],
        //     getTentativeLineDashArray: () => [0, 0],
        //     lineWidthMinPixels: 3
        // })

        // console.log(this.props.GeoJSON);

        return (
            <>
                <DeckGL
                    initialViewState={this.state.viewport}
                    controller={true}
                    layers={[layer]}
                >
                    <ReactMapGL
                        mapboxApiAccessToken="pk.eyJ1IjoicnVwZXNoMTk5OSIsImEiOiJjazMwODhhaDgwb3RsM2NvbTI4a2Y2eDRjIn0.6NHGiVhdD_fk5XQwH2rYIA"
                        mapStyle="mapbox://styles/rupesh1999/ck309110p04u71cqidmvd62qw"
                    >

                        {/* {this.props.GeoJSON.features.length === 0 ? null : this.props.GeoJSON.features.map((place, id) => (
                            place.geometry.type === "Point" ?
                                <Marker key={id} latitude={place.geometry.coordinates[1]} longitude={place.geometry.coordinates[0]}>
                                    <Icon color='violet' name='map marker alternate' />
                                </Marker> : null
                        ))} */}
                    </ReactMapGL>
                </DeckGL>
            </>
        );
    }
}

export default Map;
