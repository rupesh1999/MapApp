import React, { useState } from 'react';
import styles from "./PropertyPanel.module.css";
import { Input, Button } from 'semantic-ui-react'

export default function PropertyPanel(props) {
    const [newValues, setNewValues] = useState({});
    const btnClickHandeler = () => {
        //deleting null values from the state
        for (var propName in newValues) {
            if (newValues[propName] === null || newValues[propName] === undefined || newValues[propName] === "") {
                delete newValues[propName];
            }
        }
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
            return (
                <>
                    <h3 className={styles.heading}>Element Deleted. Please Go back</h3>
                    <Button style={{ position: "fixed", bottom: "10px" }} className={styles.btn + " " + styles.btnBottom} onClick={() => {
                        props.closePanel();
                        props.removeSelectedObj();
                    }}>Go Back</Button>
                </>
            );
        } else {
            return (
                <>
                    <h3 className={styles.heading}>Edit the {props.data.object.geometry.type}'s properties</h3>
                    <hr />
                    <br />
                    {props.data.object.geometry.type === "Point" || props.data.object.geometry.type === "MultiPoint" ?
                        <div className="inputContainer">
                            <div style={{ marginTop: "15px" }}>
                                <label>Enter the Line Color.(In hex code)</label>
                                <Input style={{ width: "350px" }} name="stroke" onChange={onChangeHandeler} type="text" placeholder="Enter Stroke value" />
                                <p className={styles.current}>Current Value is {props.data.object.properties["stroke"] === undefined ? <span>Empty</span> : props.data.object.properties["stroke"]}</p></div>
                            <div style={{ marginTop: "15px" }}>
                                <label>Enter the Line width.(In Integer)</label>
                                <Input style={{ width: "350px" }} name="strokeWidth" onChange={onChangeHandeler} type="text" placeholder="Enter Stroke Width" />
                                <p className={styles.current}>Current Value is {props.data.object.properties["stroke-width"] === undefined ? <span>Empty</span> : props.data.object.properties["stroke-width"]}</p></div>
                        </div> : null}
                    {props.data.object.geometry.type === "LineString" || props.data.object.geometry.type === "MultiLineString" ?
                        <div className="inputContainer">
                            <div style={{ marginTop: "15px" }}>
                                <label>Enter the Line Color.(In hex code)</label>
                                <Input style={{ width: "350px" }} name="stroke" onChange={onChangeHandeler} type="text" placeholder="Enter Stroke value" />
                                <p className={styles.current}>Current Value is {props.data.object.properties["stroke"]}</p></div>
                            <div style={{ marginTop: "15px" }}>
                                <label>Enter the Line width.(In Integer)</label>
                                <Input style={{ width: "350px" }} name="strokeWidth" onChange={onChangeHandeler} type="text" placeholder="Enter Stroke Width" />
                                <p className={styles.current}>Current Value is {props.data.object.properties["stroke-width"]}</p>
                            </div>
                        </div> : null}
                    {props.data.object.geometry.type === "Polygon" || props.data.object.geometry.type === "MultiPolygon" ?
                        <div className="inputContainer">
                            <div style={{ marginTop: "15px" }}>
                                <label>Enter the inner color of {props.data.object.geometry.type}</label>
                                <Input style={{ width: "350px" }} onChange={onChangeHandeler} name="fill" type="text" placeholder="Enter fill" />
                                <p className={styles.current}>Current Value is {props.data.object.properties["fill"]}</p></div>
                            <div style={{ marginTop: "15px" }}>
                                <label>Enter the Line Color.(In hex code)</label>
                                <Input style={{ width: "350px" }} name="stroke" onChange={onChangeHandeler} type="text" placeholder="Enter Stroke Value(hex code only)" />
                                <p className={styles.current}>Current Value is {props.data.object.properties["stroke"]}</p></div>
                            <div style={{ marginTop: "15px" }}>
                                <label>Enter the Line width.(In Integer)</label>
                                <Input style={{ width: "350px" }} name="strokeWidth" onChange={onChangeHandeler} type="text" placeholder="Enter Stroke Width" />
                                <p className={styles.current}>Current Value is {props.data.object.properties["stroke-width"]}</p></div>

                        </div> : null}
                    <div className={styles.btnGroup}>
                        <Button className={styles.btn} onClick={btnClickHandeler} >Submit</Button>
                        <Button className={styles.btn + " " + styles.btnBottom} onClick={() => {
                            props.closePanel();
                            props.removeSelectedObj();
                        }}>Go Back</Button>
                    </div>
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
