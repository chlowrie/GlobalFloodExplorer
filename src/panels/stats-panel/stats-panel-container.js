import * as React from 'react';
import { useState, useContext } from 'react';
import './stats-panel-container.css';
import { ReactComponent as OpenLogo } from 'assets/Opentab.svg'
import SelectedFeaturesPanel from './selected-features-panel'
import FlyToContext from '../FlyToContext';
import InfoContext from 'context/infoContext';


function Title({ nStudyUnits, locations, selectionType }) {

    function countryNameOverride(country) {
        let return_country;
        switch (country) {
            case 'Coted Ivoire':
                return_country = "Cote d'Voire"
                break
            case 'United Republicof Tanzania':
                return_country = 'United Republic of Tanzania'
                break
            default:
                return_country = country
                break
        }
        return return_country
    }

    const locations_spaces = locations.map(l => l
        // insert a space before all caps
        .replace(/([A-Z])/g, ' $1')
        // uppercase the first character
        .replace(/^./, function (str) { return str.toUpperCase(); }))
        // the first character was already capitalized, so remove that space
        .map(l => l.slice(1))
        // Convert to display names with manual override where necessary
        .map(l => countryNameOverride(l))

    const selection_display = selectionType === 'countries' ? 'Country' : 'Study Unit'

    const n_locations = locations.length
    const too_many_locations = n_locations > 3
    const locations_tmp = locations_spaces.slice(0, 3)

    const [showLocationsTooltip, setShowLocationsTooltip] = useState(false)
    const [locationTooltipX, setLocationTooltipX] = useState(null)
    const [locationTooltipY, setLocationTooltipY] = useState(null)

    // console.log(selectionType)

    function formatLocationList(locations) {
        let locationsFormatted;
        if (locations.length === 1) locationsFormatted = <div>
            <p className='locations-formatted-text inline-title-text'>{locations_spaces[0]}</p>
        </div>
        if (locations.length === 2) locationsFormatted = <div>
            <p className='locations-formatted-text inline-title-text'>{locations_spaces[0]}</p> and
            <br />
            <p className='locations-formatted-text inline-title-text'>{locations_spaces[1]}</p>
        </div>
        if (locations.length === 3) locationsFormatted = <div>
            {locations_spaces.slice(0, -1)
                .map(i => <><p className='locations-formatted-text inline-title-text'>{i}</p>,<br /></>)
                .reduce((prev, curr) => [prev, curr])}
            and {' '}
            <p className='locations-formatted-text inline-title-text'>{locations_spaces[locations_spaces.length - 1]}</p>
        </div>
        if (too_many_locations) locationsFormatted = <div>
            <p className='locations-formatted-text inline-title-text'>{locations_spaces[0]}</p>,
            <br />
            <p className='locations-formatted-text inline-title-text'>{locations_spaces[1]}</p>
            <br />
            and {' '}
            {(n_locations - 2)}
            {' '}others
        </div>
        // locations_spaces.slice(0, -1).join(', ') + ', and ' + (n_locations - 3) + ' others'
        return <div
            className='location-list'
            onMouseOver={e => onHover(e)}>{locationsFormatted}</div>
    }

    const _nStudyUnits = (n) => {
        return <p className='n-study-units-text inline-title-text'>
            {n}
        </p>
    }

    const _locations = (locationsFormatted) => {
        return <p className='locations-formatted-text inline-title-text'>
            {locationsFormatted}
        </p>
    }

    function onHover(e) {
        if (too_many_locations) {
            setShowLocationsTooltip(true)
            setLocationTooltipX(e.nativeEvent.offsetX)
            setLocationTooltipY(e.nativeEvent.offsetY)
            setTimeout(() => setShowLocationsTooltip(false), 3500)
        }
    }

    return <>
        <div className='stats-panel-title'>
            Showing <b>{selection_display}{' '}({_nStudyUnits(nStudyUnits)})</b> Statistics for: {formatLocationList(locations_tmp)}
        </div>
        {showLocationsTooltip &&
            <div className='stats-panel-locations-tooltip' style={{ right: 20, top: locationTooltipY + 50 }}>
                {locations_spaces.map(l => <><div>{l}</div><br></br></>)}
            </div>
        }
    </>
}


function TopBanner({ selectedFeatures, selectionType }) {

    const camel_to_spaces = (text) => {
        const result = text.replace(/([A-Z])/g, " $1");
        return result.charAt(0).toUpperCase() + result.slice(1);
    }
    
    const locations = [...new Set(selectedFeatures.map(x => x.properties.COUNTRY.split(',')).flat())]
    if (selectedFeatures.length === 0) {
        return <></>
    }
    return <div className='top-banner-container'>
        <Title nStudyUnits={
            selectedFeatures.map(x => x.properties.point_count ? x.properties.point_count : 1)
                .reduce((a, b) => a + b, 0)
        }
            selectionType={selectionType}
            locations={locations} />
    </div>
}

function OpenToggle({ isOpen, setIsOpen, }) {
    const { useFirst, selectRef, selectedFeatures } = useContext(InfoContext)
    const openTransform = {
        transform: 'rotate(180deg)'
    }

    useFirst([selectedFeatures.length, '!=', 0], 'FIRST_SELECT', [isOpen, '==', true])
    return <div className='open-sidebar' ref={selectRef}>
        <div>
            <div>Metrics</div>
            <div >
                <OpenLogo
                    className="open-toggle"
                    onClick={() => setIsOpen(!isOpen)}
                    style={isOpen ? openTransform : {}} />
            </div>
        </div>
    </div>
}


export default function StatsPanel({ selectedFeatures, selectionType, layerGroup, setLayerGroup, flyToViewport }) {
    const [isOpen, setIsOpen] = useState(false)

    return <div className={"right-panel" + (isOpen ? " open" : '')}>
        <OpenToggle isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className='right-panel-content'>
            <div className='right-panel-outer-content' >
                <div className='right-panel-inner-content' >
                    <TopBanner selectedFeatures={selectedFeatures} selectionType={selectionType} />
                    <FlyToContext.Provider value={{ flyToViewport, setLayerGroup }}>
                        <SelectedFeaturesPanel
                            selectedFeatures={selectedFeatures}
                            layerGroup={layerGroup}
                            setLayerGroup={setLayerGroup} />
                    </FlyToContext.Provider>
                </div>
            </div>
        </div>
    </div>
}