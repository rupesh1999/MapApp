import React from 'react';
import styles from "./popupComponent.module.css";
import { Button , Icon} from 'semantic-ui-react';
import area from "@turf/area";
import length from "@turf/length";

export default function PopupComponent(props) {
    const btnClickHandeler = () => {
        console.log(props.info.index);
        props.showPanel()
        props.removePopup();
    }
    const DelBtnClickHandeler = () => {
        props.deleteItem(props.info.index);
    }
    return (
        <div className={styles.popup}>
            <div className={styles.heading}>
            <p>Type of Data: {props.info.object.geometry.type}</p>
            <Icon className={styles.icon } color='violet' name='close' onClick = {() => props.closePopup()}/>
            </div>
            {props.info.object.geometry.type === "Polygon" || props.info.object.geometry.type === "MultiPolygon"?
            <div>
                <p>Area of the {props.info.object.geometry.type} is {(area(props.info.object)).toFixed(2)} meter square</p>
                <p>Length of parameter of{props.info.object.geometry.type} is {(length(props.info.object)).toFixed(2)} Miles.</p>
            </div> : null}
            {props.info.object.geometry.type === "LineString" || props.info.object.geometry.type === "MultiLineString"?
            <div>
                <p>Length of the {props.info.object.geometry.type} is {(length(props.info.object)).toFixed(2)} Miles</p>
            </div> : null}
            <Button onClick={btnClickHandeler} href="#"> Edit</Button>
            <Button onClick={DelBtnClickHandeler} href="#"> Delete</Button>
        </div>
    )
}
