import React, { Component } from 'react';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer } from '@deck.gl/layers';
// import { EditableGeoJsonLayer, SelectionLayer } from '@nebula.gl/layers';
// import { DrawPolygonMode } from "@nebula.gl/edit-modes";
import ReactMapGL, { FlyToInterpolator } from 'react-map-gl';
import bbox from "@turf/bbox";
// const selectedFeatureIndexes = [];



class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                width: "100%",
                height: "100%",
                latitude: 37.75682426026292,
                longitude: -122.45399951934814,
                zoom: 10.4,
                pitch: 0,
                bearing: 0,

            },
            selectedFeatureIndexes: [],
            dragStartCoord: {
                x: null,
                y: null
            },
            dragEndCoord: {
                x: null,
                y: null
            },
            // forceUpdate: true,
            // showPopup: false,
            // selectedObj: {
            //     coordinates: [0, 0]
            // }
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
    dragStart = (info) => {
        this.setState({ dragStartCoord: { x: info.x, y: info.y } });
        this.props.hidePopup();
    }

    dragEnd = (info) => {
        this.setState({ dragEndCoord: { x: info.x, y: info.y } });
        let diff_x = this.state.dragStartCoord.x - this.state.dragEndCoord.x;
        let diff_y = this.state.dragStartCoord.y - this.state.dragEndCoord.y;
        console.log(diff_x, diff_y);
        this.setState({ dragStartCoord: { x: null, y: null } });
        this.setState({ dragEndCoord: { x: null, y: null } });
        this.props.changePopupPos(diff_x, diff_y);
        this.props.showPopup();
    }

    checkViewport = () => {
        let boundingBox = bbox(this.props.GeoJSON);
        let lat = (boundingBox[1] + boundingBox[3]) / 2;
        let lon = (boundingBox[0] + boundingBox[2]) / 2;
        if (this.props.GeoJSON.features.length !== 0 && this.state.viewport.latitude !== lat && this.state.viewport.longitude !== lon) {
            this.setState({
                viewport: {
                    ...this.state.viewport,
                    latitude: lat,
                    longitude: lon
                }
            });
        }
        console.log(this.state.viewport);
    }

    componentDidUpdate = () => {
        if (this.props.GeoJSON.features.length !== 0) {
            this.checkViewport()
        }
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
            // highlightedObjectIndex: 5,
            lineWidthScale: 20,
            lineWidthMinPixels: 2,
            mask: true,
            shouldUpdate: (changeFlags) =>  {
                console.log("changes");
                return changeFlags.viewportChanged; // default is now changeFlags.propsOrDataChanged;
            },
            getFillColor: d => {
                // console.log(d.properties.fill);
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
            getFillOpacity: d => {
                if (d.properties["fill-opacity"] === undefined) {
                    return;
                } else {
                    return d.properties["fill-opacity"];
                }
            },
            getElevation: 30,
            onClick: info => {
                // console.log("this is the info");
                // this.setState({ selectedObj: info });
                // console.log(this.state.selectedObj);
                this.props.setSelectedObject(info);
                this.setState({ showPopup: true });
                this.props.showPopup();
            },
            
            
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
                    initialViewState = {this.state.viewport}
                    controller={true}
                    layers={[layer]}
                    onDragStart={(info) => this.dragStart(info)}
                    onDragEnd={(info) => this.dragEnd(info)}
                >
                    <ReactMapGL
                        mapboxApiAccessToken="pk.eyJ1IjoicnVwZXNoMTk5OSIsImEiOiJjazMwODhhaDgwb3RsM2NvbTI4a2Y2eDRjIn0.6NHGiVhdD_fk5XQwH2rYIA"
                        mapStyle="mapbox://styles/rupesh1999/ck35rnbta1zlt1cp7k1m2ies3"
                    // onInteractionStateChange = {(interactionState) => console.log(interactionState)}
                    // onViewportChange = {(viewState, interactionState, oldViewState) => console.log(viewState)}
                    >
                        {/* {this.state.showPopup === true ?
                            <Popup
                                onClick={() => console.log("popup clicked")}
                                viewport={this.state.viewport}
                                latitude={this.state.selectedObj.coordinate[1]}
                                longitude={this.state.selectedObj.coordinate[0]}
                                closeButton={true}
                                closeOnClick={true}
                                onClose={() => this.setState({ showPopup: false })}
                                captureDrag={false}
                                captureScroll={false}
                                captureDoubleClick={false}
                                anchor="top" >
                                <div>You are here</div>
                            </Popup> : null} */}

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
