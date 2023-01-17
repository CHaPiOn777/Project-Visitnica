import { useEffect } from "react";
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { ZoomControl } from "@pbe/react-yandex-maps/typings/controls/ZoomControl";
import pin from '../../images/pin.svg'


export default function MapPage() {
  const defaultState = {
    center: [55.751574, 37.573856],
    zoom: 5,
    
  };

  return (
    <YMaps>
      <Map defaultState={defaultState} width='100%' height='calc(100vh - 153px)'>
        <Placemark 
          geometry={[55.751574, 37.573856]}
          properties={{
          }}
          options={{
            iconLayout: 'default#image',
            iconImageHref: pin,
          }}
        />
      </Map>
    </YMaps>
  )
}