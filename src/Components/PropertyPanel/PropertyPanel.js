import React, { useState } from 'react';
import styles from "./PropertyPanel.module.css";
import { Input, Button } from 'semantic-ui-react'

export default function PropertyPanel(props) {
    const [newValues, setNewValues] = useState({});
    const btnClickHandeler = () => {
        for (var propName in newValues) {
            if (newValues[propName] === null || newValues[propName] === undefined || newValues[propName] === "") {
                delete newValues[propName];
            }
        }
        // console.log(newValues);
        props.setProperties(newValues);
        setNewValues({});
    }
    const onChangeHandeler = (e) => {
        // console.log(e.target.name);
        switch (e.target.name) {
            case "markerColor": {
                const temp = {
                    ...newValues
                }
                temp["marker-color"] = e.target.value;
                setNewValues(temp);
                break;
            }
            case "markerSize": {
                const temp = {
                    ...newValues
                }
                temp["marker-size"] = e.target.value;
                setNewValues(temp);
                break;
            }
            case "stroke": {
                const temp = {
                    ...newValues
                }
                temp["stroke"] = e.target.value;
                setNewValues(temp);
                break;
            }
            case "strokeWidth": {
                const temp = {
                    ...newValues
                }
                temp["stroke-width"] = parseInt(e.target.value);
                setNewValues(temp);
                break;
            }
            case "strokeOpacity": {
                const temp = {
                    ...newValues
                }
                temp["stroke-opacity"] = parseFloat(e.target.value);
                setNewValues(temp);
                break;
            }
            case "fill": {
                const temp = {
                    ...newValues
                }
                temp["fill"] = e.target.value;
                setNewValues(temp);
                break;
            }
            case "fillOpacity": {
                const temp = {
                    ...newValues
                }
                // console.log(temp);
                temp["fill-opacity"] = parseFloat(e.target.value);
                setNewValues(temp);
                break;
            }
            default: {
                console.log("no expression matchde");
            }
        }
        // console.log(e.target.value);
    }
    const editJSX = () => {
        if (props.data === null) {
            return <h3>element deleted</h3>
        } else {
            return (
                <>
                    <h3>Edit the annotation's properties</h3>
                    <br />
                    {/* {props.data.object.properties["marker-color"] !== undefined ?
                        <div style={{ display: "flex" }}>
                            <Input name="markerColor" onChange={onChangeHandeler} type="text" placeholder="Enter Marker Color" />
                            <p>Current Value is {props.data.object.properties["marker-color"]}</p>
                        </div> : null}
                    {props.data.object.properties["marker-size"] !== undefined ?
                        <div style={{ display: "flex" }}>
                            <Input name="markerSize" onChange={onChangeHandeler} type="text" placeholder="Enter Marker Size" />
                            <p>Current Value is {props.data.object.properties["marker-size"]}</p>
                        </div> : null}
                    {props.data.object.properties["stroke"] !== undefined ?
                        <div style={{ display: "flex" , justifyContent: "space-between" }}>
                            <Input name="stroke" onChange={onChangeHandeler} type="text" placeholder="Enter Stroke value" />
                            <p>Current Value is {props.data.object.properties["stroke"]}</p>
                        </div> : null}

                    {props.data.object.properties["stroke-width"] !== undefined ?
                        <div style={{ display: "flex" , justifyContent: "space-between"}}>
                            <Input name="strokeWidth" onChange={onChangeHandeler} type="text" placeholder="Enter Stroke Width" />
                            <p>Current Value is {props.data.object.properties["stroke-width"]}</p>
                        </div> : null}
                    {props.data.object.properties["stroke-opacity"] !== undefined ?
                        <div style={{ display: "flex" , justifyContent: "space-between"}}>
                            <Input name="strokeOpacity" onChange={onChangeHandeler} type="text" placeholder="Enter Stroke Opacity" />
                            <p>Current Value is {props.data.object.properties["stroke-opacity"]}</p>
                        </div> : null}
                    {props.data.object.properties["fill"] !== undefined ?
                        <div style={{ display: "flex" , justifyContent: "space-between"}}>
                            <Input onChange={onChangeHandeler} name="fill" type="text" placeholder="Enter fill" />
                            <p>Current Value is {props.data.object.properties["fill"]}</p>
                        </div> : null}
                    {props.data.object.properties["fill-opacity"] !== undefined ?
                        <div style={{ display: "flex" , justifyContent: "space-between"}}>
                            <Input onChange={onChangeHandeler} name="fillOpacity" type="text" placeholder="Enter fill-opacity" />
                            <p>Current Value is {props.data.object.properties["fill-opacity"]}</p>
                        </div> : null} */}
                    {props.data.object.geometry.type === "Point" || props.data.object.geometry.type === "MultiPoint" ?
                        <div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Input name="stroke" onChange={onChangeHandeler} type="text" placeholder="Enter Stroke value" />
                                <p>Current Value is {props.data.object.properties["stroke"]}</p></div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Input name="strokeWidth" onChange={onChangeHandeler} type="text" placeholder="Enter Stroke Width" />
                                <p>Current Value is {props.data.object.properties["stroke-width"]}</p></div>
                        </div> : null}
                    {props.data.object.geometry.type === "LineString" || props.data.object.geometry.type === "MultiLineString" ?
                        <div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Input name="stroke" onChange={onChangeHandeler} type="text" placeholder="Enter Stroke value" />
                                <p>Current Value is {props.data.object.properties["stroke"]}</p></div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Input name="strokeWidth" onChange={onChangeHandeler} type="text" placeholder="Enter Stroke Width" />
                                <p>Current Value is {props.data.object.properties["stroke-width"]}</p>
                            </div>
                        </div> : null}
                    {props.data.object.geometry.type === "Polygon" || props.data.object.geometry.type === "MultiPolygon" ?
                        <div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Input onChange={onChangeHandeler} name="fill" type="text" placeholder="Enter fill" />
                                <p>Current Value is {props.data.object.properties["fill"]}</p></div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Input name="stroke" onChange={onChangeHandeler} type="text" placeholder="Enter Stroke Value(hex code only)" />
                                <p>Current Value is {props.data.object.properties["stroke"]}</p></div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Input name="strokeWidth" onChange={onChangeHandeler} type="text" placeholder="Enter Stroke Width" />
                                <p>Current Value is {props.data.object.properties["stroke-width"]}</p></div>

                        </div> : null}
                    <Button onClick={btnClickHandeler} >Submit</Button>
                </>
            );
        }
    }
    return (
        <div className={styles.container}>
            {editJSX()}
        </div>
    )
}
