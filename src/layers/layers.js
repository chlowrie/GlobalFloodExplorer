// AEB REP PTS
import {
    Blue_5Step,
    Blue_5Step_0_1,
    Blue_5Step_per_ha,
    SelectedTessela,
    FloodMaps_Bathy,
    Empty
} from "./colormaps/colormaps"


const annual_benefits = [
    {
        id: 'countries',
        source: 'countries',
        source_layer: 'Countries',
        colorValue: ['to-number', ['get', 'Ab_S_BAE']],
        legend: Blue_5Step,
        layer_title: 'Tessela',
        layer_type: 'FILL_WITH_OUTLINE',
        minzoom: 0,
        maxzoom: 4,
        opacity: 0.9,
        display_legend: false,
        is_selectable: true
    },
    {
        id: 'tessela_rps',
        source: 'tesselas',
        source_layer: 'RP',
        colorValue: ['to-number', ['get', 'Ab_S_BAE']],
        legend: Blue_5Step,
        layer_title: 'Annual Expected Benefit',
        layer_type: 'DISCRETE_POINT',
        legend_prefix: '$',
        format: '$',
        is_selectable: true
    }, {
        id: 'tessela_bounds',
        source: 'tesselas',
        source_layer: 'Tesselas',
        legend: SelectedTessela,
        layer_title: 'Tessela',
        layer_type: 'SIMPLE_OUTLINE',
        selection_dependent_on: 'RP'
    }]

const reduct_ratio = [{
    id: 'countries',
    source: 'countries',
    source_layer: 'Countries',
    colorValue: ['case',
        ['==', ['to-number', ['get', 'Ab_S_WoAE']], 0], 0,
        ['-',
            1,
            ['to-number', ['/',
                ['to-number', ['get', 'Ab_S_WAE']],
                ['to-number', ['get', 'Ab_S_WoAE']]
            ]]]
    ],
    legend: Blue_5Step_0_1,
    layer_title: 'Tessela',
    layer_type: 'FILL_WITH_OUTLINE',
    display_legend: false,
    minzoom: 0,
    maxzoom: 4,
    opacity: 0.9,
    is_selectable: true
}, {
    id: 'hex',
    source: 'tesselas',
    source_layer: 'Hex_p035',
    legend: Blue_5Step_0_1,
    colorValue: ['case',
        ['==', ['to-number', ['get', 'Ab_S_WoAE']], 0], 0,
        ['-',
            1,
            ['to-number', ['/',
                ['to-number', ['get', 'Ab_S_WAE']],
                ['to-number', ['get', 'Ab_S_WoAE']]
            ]]]
    ],
    heightValue: ['get', 'Ab_S_WoAE'],
    baseValue: ['get', 'Ab_S_WAE'],
    scale: 0.5,
    legend: Blue_5Step_0_1,
    layer_title: 'Risk Reduction',
    layer_type: 'HEX_3D',
    hex_type: 'REDUCTION',
    legend_suffix: '%',
    format: '%',
    display_legend: true,
    is_selectable: true
}, {
    id: 'hex2',
    source: 'tesselas',
    source_layer: 'Hex_p035',
    legend: Blue_5Step_0_1,
    colorValue: 'white',
    heightValue: ['get', 'Ab_S_WAE'],
    baseValue: 0,
    scale: 0.5,
    layer_title: 'Tessela',
    layer_type: 'HEX_3D',
    hex_type: 'BASE',
    legend_suffix: '%',
    format: '%',
    display_legend: false,
    is_selectable: true
}, {
    id: 'tessela_bounds',
    source: 'tesselas',
    source_layer: 'Tesselas',
    legend: SelectedTessela,
    layer_title: 'Tessela',
    layer_type: 'SIMPLE_OUTLINE',
    selection_dependent_on: 'Hex_p035'
}]

const per_ha = [{
    id: 'countries',
    source: 'countries',
    source_layer: 'Countries',
    colorValue: ['case',
        ['==', ['to-number', ['get', 'Man2010']], 0], 0,
        ['/',
            ['to-number', ['get', 'Ab_S_BAE']],
            ['to-number', ['get', 'Man2010']]
        ]],
    legend: Blue_5Step_per_ha,
    layer_title: 'Tessela',
    layer_type: 'FILL_WITH_OUTLINE',
    minzoom: 0,
    maxzoom: 4,
    display_legend: false,
    opacity: 0.9,
    is_selectable: true
},
{
    id: 'tessela_rps',
    source: 'tesselas',
    source_layer: 'RP',
    colorValue: ['case',
        ['==', ['to-number', ['get', 'Man2010']], 0], 0,
        ['/',
            ['to-number', ['get', 'Ab_S_BAE']],
            ['to-number', ['get', 'Man2010']]
        ]],
    legend: Blue_5Step_per_ha,
    layer_title: 'Benefit per Hectare',
    layer_type: 'DISCRETE_POINT',
    legend_prefix: '$',
    format: '$',
    is_selectable: true
}, {
    id: 'tessela_bounds',
    source: 'tesselas',
    source_layer: 'Tesselas',
    legend: SelectedTessela,
    layer_title: 'Tessela',
    layer_type: 'SIMPLE_OUTLINE',
    selection_dependent_on: 'RP'
}]

const flooding = [
    // ******************
    // WITH
    // ******************
    {
        id: "flooding_without0",
        source: 'flooding_without',
        source_layer: 'T0',
        legend: FloodMaps_Bathy,
        // colorValue: ['to-number', ['get', 'grid_code']],
        colorValue: 'rgba(255, 255, 255, 0.8)',
        layer_title: 'Without Mangroves, RP50',
        layer_type: 'GEO_POINT',
        legend_suffix: 'm',
        is_subgroup: true,
        display_legend: true,
        minzoom: 6
    },
    {
        id: "flooding_without1",
        source: 'flooding_without',
        source_layer: 'T1',
        legend: FloodMaps_Bathy,
        // colorValue: ['to-number', ['get', 'grid_code']],
        colorValue: '#bae4bc',
        layer_title: 'Without Mangroves, RP50',
        layer_type: 'GEO_POINT',
        legend_suffix: 'm',
        is_subgroup: true,
        minzoom: 6
    }, {
        id: "flooding_without2",
        source: 'flooding_without',
        source_layer: 'T2',
        legend: FloodMaps_Bathy,
        // colorValue: ['to-number', ['get', 'grid_code']],
        colorValue: '#7bccc4',
        layer_title: 'Without Mangroves, RP50',
        layer_type: 'GEO_POINT',
        legend_suffix: 'm',
        is_subgroup: true,
        minzoom: 6
    }, {
        id: "flooding_without3",
        source: 'flooding_without',
        source_layer: 'T3',
        legend: FloodMaps_Bathy,
        // colorValue: ['to-number', ['get', 'grid_code']],
        colorValue: '#43a2ca',
        layer_title: 'Without Mangroves, RP50',
        layer_type: 'GEO_POINT',
        legend_suffix: 'm',
        is_subgroup: true,
        minzoom: 6
    }, {
        id: "flooding_without4",
        source: 'flooding_without',
        source_layer: 'T4',
        legend: FloodMaps_Bathy,
        // colorValue: ['to-number', ['get', 'grid_code']],
        colorValue: '#0868ac',
        layer_title: 'Without Mangroves, RP50',
        layer_type: 'GEO_POINT',
        legend_suffix: 'm',
        is_subgroup: true,
        minzoom: 6
    }, {
        id: "flooding_without5",
        source: 'flooding_without',
        source_layer: 'T5',
        legend: FloodMaps_Bathy,
        // colorValue: ['to-number', ['get', 'grid_code']],
        colorValue: '#0868ac',
        layer_title: 'Without Mangroves, RP50',
        layer_type: 'GEO_POINT',
        legend_suffix: 'm',
        is_subgroup: true,
        minzoom: 5
    }, {
        id: "flooding_without6",
        source: 'flooding_without',
        source_layer: 'T6',
        legend: FloodMaps_Bathy,
        // colorValue: ['to-number', ['get', 'grid_code']],
        colorValue: '#0868ac',
        layer_title: 'Without Mangroves, RP50',
        layer_type: 'GEO_POINT',
        legend_suffix: 'm',
        is_subgroup: true,
        minzoom: 4
    },
    // ******************
    // WITH
    // ******************
    {
        id: "flooding_with0",
        source: 'flooding_with',
        source_layer: 'T0',
        legend: FloodMaps_Bathy,
        // colorValue: ['to-number', ['get', 'grid_code']],
        colorValue: 'rgba(255, 255, 255, 0.8)',
        layer_title: 'With Mangroves, RP50',
        layer_type: 'GEO_POINT',
        legend_suffix: 'm',
        is_subgroup: true,
        display_legend: true,
        minzoom: 6
    },
    {
        id: "flooding_with1",
        source: 'flooding_with',
        source_layer: 'T1',
        legend: FloodMaps_Bathy,
        // colorValue: ['to-number', ['get', 'grid_code']],
        colorValue: '#bae4bc',
        layer_title: 'Without Mangroves, RP50',
        layer_type: 'GEO_POINT',
        legend_suffix: 'm',
        is_subgroup: true,
        minzoom: 6
    }, {
        id: "flooding_with2",
        source: 'flooding_with',
        source_layer: 'T2',
        legend: FloodMaps_Bathy,
        // colorValue: ['to-number', ['get', 'grid_code']],
        colorValue: '#7bccc4',
        layer_title: 'Without Mangroves, RP50',
        layer_type: 'GEO_POINT',
        legend_suffix: 'm',
        is_subgroup: true,
        minzoom: 6
    }, {
        id: "flooding_with3",
        source: 'flooding_with',
        source_layer: 'T3',
        legend: FloodMaps_Bathy,
        // colorValue: ['to-number', ['get', 'grid_code']],
        colorValue: '#43a2ca',
        layer_title: 'Without Mangroves, RP50',
        layer_type: 'GEO_POINT',
        legend_suffix: 'm',
        is_subgroup: true,
        minzoom: 6
    }, {
        id: "flooding_with4",
        source: 'flooding_with',
        source_layer: 'T4',
        legend: FloodMaps_Bathy,
        // colorValue: ['to-number', ['get', 'grid_code']],
        colorValue: '#0868ac',
        layer_title: 'Without Mangroves, RP50',
        layer_type: 'GEO_POINT',
        legend_suffix: 'm',
        is_subgroup: true,
        minzoom: 6
    }, {
        id: "flooding_with5",
        source: 'flooding_with',
        source_layer: 'T5',
        legend: FloodMaps_Bathy,
        // colorValue: ['to-number', ['get', 'grid_code']],
        colorValue: '#0868ac',
        layer_title: 'Without Mangroves, RP50',
        layer_type: 'GEO_POINT',
        legend_suffix: 'm',
        is_subgroup: true,
        minzoom: 5
    }, {
        id: "flooding_with6",
        source: 'flooding_with',
        source_layer: 'T6',
        legend: FloodMaps_Bathy,
        // colorValue: ['to-number', ['get', 'grid_code']],
        colorValue: '#0868ac',
        layer_title: 'Without Mangroves, RP50',
        layer_type: 'GEO_POINT',
        legend_suffix: 'm',
        is_subgroup: true,
        minzoom: 4
    },
    {
        id: 'tessela_rps',
        source: 'tesselas',
        source_layer: 'RP',
        colorValue: ['to-number', ['get', 'Ab_S_BAE']],
        legend: Empty,
        layer_title: 'Annual Expected Benefit',
        layer_type: 'DISCRETE_POINT',
        legend_prefix: '$',
        format: '$',
        display_legend: false
    }, {
        id: 'tessela_bounds',
        source: 'tesselas',
        source_layer: 'Tesselas',
        legend: SelectedTessela,
        layer_title: 'Tessela',
        layer_type: 'SIMPLE_OUTLINE',
        selection_dependent_on: 'RP'
    }]

const layers = {
    'Benefit (AEB)': annual_benefits,
    'Benefit per Hectare': per_ha,
    'Risk Reduction Ratio': reduct_ratio,
    'Flooding': flooding
}

export default layers