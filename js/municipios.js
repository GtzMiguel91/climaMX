const updateValues = (classNames, data, keyNames) => {
    let keyName, dia, pronostico;
    let keyDia = keyNames[keyNames.length - 2], keyPronostico = keyNames[keyNames.length - 1]
    classNames.forEach((className, idx) => {
        keyName = keyNames[idx]
        $('.' + className).each(function (index) {
            if (className == 'clima-img') {
                pronostico = data[index][keyPronostico]
                $(this).attr('src', `../img/clima/${pronostico}.png`);
            }
            else if (className == 'clima-title') {
                dia = data[index][keyDia]
                pronostico = data[index][keyPronostico]
                $(this).text(`${dia} - ${pronostico}`);
            } else {
                $(this).text(data[index][keyName]);
            }

        });
    })

}

const getDayName = (index) => {
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sabado'];
    return daysOfWeek[index];
};

const getNameDays = () => {
    const currentDate = new Date();

    const daysArray = [];
    const todayName = getDayName(currentDate.getDay());
    daysArray.push(todayName);

    // Get and store the next three days' names
    for (let i = 1; i <= 3; i++) {
        const nextDay = new Date();
        nextDay.setDate(currentDate.getDate() + i);
        const nextDayName = getDayName(nextDay.getDay());
        daysArray.push(nextDayName);
    }

    return daysArray;
}

const filterMunicipio = (data, municipio, days) => {
    const dataFiltered = data.filter(elem => elem.nmun == municipio)
    dataFiltered.forEach(elem => {
        if (elem.ndia == "0") {
            elem["dia"] = "Hoy"
        } else {
            elem["dia"] = days[parseInt(elem.ndia)]
        }
    })
    return dataFiltered
}

const getStateUrl = () => {
    const searchLocation = window.location.search;
    const estado = searchLocation.split('estado=');
    if (estado.length > 1) {
        let estado_return = decodeURIComponent(estado[1])
        let idx = estados.indexOf(estado_return)
        if (estado_return == 'cdmx') {
            idx = estados.indexOf(estado_return)
            estado_return = 'ciudad de mexico'

        }
        return [estado_return, idx]
    } else {
        return '';
    }
}

function quitarTildes(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

$(document).ready(async function () {
    await addGeneralElements()
    const state = getStateUrl();
    const days = getNameDays()
    const dataForecast = await fetch("../../data/DailyForecast_MX.json");
    const dataForecastJson = await dataForecast.json();
    const dataFiltered = dataForecastJson.filter(elem => quitarTildes(elem.nes.toLowerCase()) == state[0])
    const municipiosSet = new Set();
    const clima = new Set()

    dataForecastJson.forEach(element => {
        clima.add(element.desciel);
    })

    dataFiltered.forEach(element => {
        municipiosSet.add(element.nmun);
    });
    const municipios = [...municipiosSet]
    let capital = info_estados[state[0]].capital
    const info_estado = info_estados[state[0]]
    const state_idx = state[1] + 1
    const data_selected = filterMunicipio(dataFiltered, capital, days);

    addMainElement({ state_idx, info_estado, municipios, capital, data_selected })
    $('.js-example-responsive').select2({
        theme: 'bootstrap4',
        width: 'resolve'
    });
    $('.js-example-responsive').val(capital).trigger('change');

    $('.js-example-responsive').on('change', function () {
        const selectedValue = $(this).val();
        const dataSelected = filterMunicipio(dataFiltered, selectedValue, days)
        console.log(dataSelected)
        const classNames = ["clima-temp-max", "clima-temp-min", "clima-nubes", "clima-viento", "clima-lat", "clima-lon", "clima-img", "clima-title"]
        const keyNames = ["tmax", "tmin", "cc", "velvien", "lat", "lon", "dia", "desciel"]
        updateValues(classNames, dataSelected, keyNames)
        $('#municipio-clima').text(selectedValue);
    });
});