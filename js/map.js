ymaps.ready(function () {
	var myMap = new ymaps.Map('map', {
		center: [59.875637, 30.261709],
		zoom: 16,
		controls: ['smallMapDefaultSet']
	}, {
		searchControlProvider: 'yandex#search'
	}),
	MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
		'<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
	),
	myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
		hintContent: 'ООО "Зоомаркет"',
		balloonContent: 'Описание где вход'
	}, {
		// Опции.
		// Необходимо указать данный тип макета.
		iconLayout: 'default#image',
		// Своё изображение иконки метки.
		iconImageHref: 'i/map__dot.png',
		// Размеры метки.
		iconImageSize: [45, 65],
		// Смещение левого верхнего угла иконки относительно
		// её "ножки" (точки привязки).
		iconImageOffset: [-23, -65]
	});
	myMap.geoObjects.add(myPlacemark);
});