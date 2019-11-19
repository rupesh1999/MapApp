import React, { useState } from 'react';
import { Grid, Divider, Segment } from 'semantic-ui-react';
import FileDroper from "./Components/FileDroper/FileDroper";
import 'semantic-ui-css/semantic.min.css';
import Map from "./Components/Map/Map";
import PopupComponent from "./Components/Map/popupComponent/popupComponent";
import PropertyPanel from "./Components/PropertyPanel/PropertyPanel";
import Header from "./Components/UiComponents/Header/Header";
import Footer from "./Components/UiComponents/Footer/Footer";
function App() {
	const [geoData, setGeoData] = useState({
		type: "FeatureCollection",
		features: []
	});
	const [showPanel, setShowPanel] = useState(false);

	const [selectedObj, setSelectedObj] = useState(null);

	const getData = (data) => {
		setGeoData(data);
	}

	const setData = (data) => {
		setGeoData(data);
	}

	const deleteFeature = (id) => {
		const newFeatures = geoData.features.filter((el, index) => id !== index);
		const newData = {
			...geoData,
			features: newFeatures
		}
		setGeoData(newData);
		setSelectedObj(null);
	}

	const _renderTooltip = () => {
		if (selectedObj !== null) {
			// console.log(selectedObj.coordinate[1]);
		}
		return selectedObj && (
			<div style={{ position: 'absolute', zIndex: 999, left: selectedObj.x, top: selectedObj.y }}>
				<PopupComponent
					deleteItem={(id) => deleteFeature(id)}
					info={selectedObj}
					closePopup={() => {
						setSelectedObj(null);
						setShowPanel(false);
					}}
					removePopup = {() => {}}
					showPanel={() => { setShowPanel(true); }}
				/>
			</div>
		);
	}

	const SetProperty = (data) => {
		let temp1 = JSON.parse(JSON.stringify(geoData));
		temp1.features[selectedObj.index].properties = {
			...temp1.features[selectedObj.index].properties,
			...data
		}
		setGeoData(temp1);

	}

	console.log(geoData);
	return (
		<>
			<div>
				<Header />
				<Grid celled style={{ height: "100vh", margin: "0", padding: "0" }} columns={2} relaxed='very'>
					<Grid.Column width={11}>
						<Map
							setData={(data) => setData(data)}
							setSelectedObject={(data) => setSelectedObj(data)}
							GeoJSON={geoData} />
						{_renderTooltip()}
					</Grid.Column>
					<Grid.Column style={{ backgroundColor: "#f5f5f5" }} width={5}>
						{showPanel === false ?
							<FileDroper getData={(data) => getData(data)} /> :
							<PropertyPanel closePanel={() => setShowPanel(false)} data={selectedObj} setProperties={(data) => SetProperty(data)} />}
					</Grid.Column>
				</Grid>
			</div>

			{/* <Footer /> */}
		</>
	);
}
export default App;
