
var dashboard_widget_1 = new Dashboard_Widget( '#dashboard_widget_1', {
    color: {
        base: '#cb60b3',
        lighter: '#de47ac'
    },
    radius: 150,
    label: {
        number: 341,
        text: 'Taken'
    },
    values: [
        { label: 'Taak A', percentage: 20, value: 4 },
        { label: 'Taak B', percentage: 25, value: 5 },
        { label: 'Taak C', percentage: 30, value: 6 },
        { label: 'Taak D', percentage: 5, value: 1 },
        { label: 'Taak E', percentage: 20, value: 4 }
    ]
});

var dashboard_widget_2 = new Dashboard_Widget( '#dashboard_widget_2', {
    color: {
        base: '#2989D8',
        lighter: '#1e5799'
    },
    radius: 100,
    label: {
        number: 78,
        text: 'Oefeningen'
    },
    values: [
        { label: 'Oefening A', percentage: '20' },
        { label: 'Oefening B', percentage: '50' },
        { label: 'Oefening C', percentage: '10' },
        { label: 'Oefening D', percentage: '20' }
    ]
});

var dashboard_widget_3 = new Dashboard_Widget( '#dashboard_widget_3', {
    color: {
        base: '#9ecb2d',
        lighter: '#72aa00'
    },
    radius: 200,
    label: {
        number: 3,
        text: 'Slices'
    },
    values: [
        { label: 'Slice A', percentage: 100/3 },
        { label: 'Slice B', percentage: 100/3 },
        { label: 'Slice C', percentage: 100/3 }
    ]
});

