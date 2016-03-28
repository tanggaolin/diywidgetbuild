/**
 * Created by tanggaolin on 16-3-21.
 */
define(['jquery'], function ($) {


    var widget_tmp_xml = '<AbsoluteElement xmlns:android="http://schemas.android.com/apk/res/android" android:layout_width="524dp" android:layout_height="768dp"></AbsoluteElement>';
    var xml_config =  new DOMParser().parseFromString(widget_tmp_xml, "text/xml");

    var widget_width = 0;
    var widget_height = 0;
    var px_dp_raito = 3;

    var fonts_config = JSON.parse($('#default-fontfamily').val());
    var default_font_url = fonts_config[0]['url'];
    var default_fontfamily_file =  default_font_url.substring(default_font_url.lastIndexOf('/')+1);
    var default_fontfamily =  fonts_config[0]['font_name'];

    var has_bg_img = 0;
    var has_weather = 0;
    var has_battery = 0;
    var widget_base_path = $('#widget-base-path').val();
    var defau_bg_img = widget_base_path + '/icons/widget_bg.png';

    var image_list = [];

    var default_weather_icon = widget_base_path + '/icons/w01d.png';
    var default_battery_icon = widget_base_path + '/icons/battery_20.png';

    //var default_weather_width = ;
    //var default_weather_height = ;

    var date_text_types = [
        'DATE',
        'DATE_YEAR',
        'DATE_LONG_YEAR'
    ];

    var time_text_types = [
        'TIME_AMPM',
        'TIME',
        'TIME_DIGITAL_HOUR',
        'TIME_DIGITAL_12HOUR'
    ];


    var text_type_value = {
        'DATE':'2016/10/10',
        'DATE_YEAR':'16',
        'DATE_LONG_YEAR':'2016',
        'TIME_AMPM':'am',
        'TIME':'10:28',
        'TIME_DIGITAL_HOUR':'24',
        'TIME_DIGITAL_12HOUR':'10'
    };

    var setWidgetWidth = function (width) {
        widget_width = width / px_dp_raito;
    };

    var setWidgetHeight = function (height) {
        widget_height = height / px_dp_raito;
    };



    var getTextType = function(type){
        return text_type_value[type];
    };


    var initWidgetConfig = function () {

        var image_msg = JSON.parse($('#image-res').val());
        //bg-image
        this.has_bg_img = image_msg['has_bg_img'];
        this.widget_width = Math.round(image_msg['bg_img_size']['w'] / px_dp_raito);
        this.widget_height = Math.round(image_msg['bg_img_size']['h'] / px_dp_raito);

        //weather
        this.has_weather = image_msg['has_weather'];
        if(this.has_weather){
            this.default_weather_icon = widget_base_path + 'icons/' + image_msg['weather_list'][0];
        }

        //batter
        this.has_battery = image_msg['has_battery'];
        if(this.has_battery){
            this.default_battery_icon = widget_base_path + 'icons/' + image_msg['battery_list'][0];
        }

        //image_list
        this.image_list = image_msg['all_image_list'];

        $('.widget-area').css({'width':this.widget_width,'height':this.widget_height});
        $('#widget-preview').css({'width':this.widget_width});

        $(this.xml_config).find("AbsoluteElement").attr('android:layout_width', this.widget_width + 'dp');
        $(this.xml_config).find("AbsoluteElement").attr('android:layout_height', this.widget_height + 'dp');

        return this;
    };

    return {

        text_type_value:text_type_value,
        date_text_types:date_text_types,
        time_text_types:time_text_types,
        widget_width:widget_width,
        widget_height:widget_height,
        has_bg_img:has_bg_img,
        widget_base_path:widget_base_path,
        xml_config:xml_config,
        fonts_config:fonts_config,
        default_fontfamily:default_fontfamily,
        default_fontfamily_file:default_fontfamily_file,
        has_weather:has_weather,
        has_battery:has_battery,
        default_weather_icon:default_weather_icon,
        defau_bg_img:defau_bg_img,
        px_dp_raito:px_dp_raito,
        image_list:image_list,
        default_battery_icon:default_battery_icon,

        initWidgetConfig:initWidgetConfig,
        setWidgetWidth:setWidgetWidth,
        setWidgetHeight:setWidgetHeight,
        getTextType:getTextType
    };
});