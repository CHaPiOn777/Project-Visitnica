import { useEffect, useState } from "react";
import { YMaps, Map, ZoomControl, TrafficControl, SearchControl, RouteButton, RulerControl } from '@pbe/react-yandex-maps';
import { CustomPlacemark } from "../../components/placemark/placemark";
import getCohortProfiles from "../../services/utils/api/get-cohort-profiles";
import { TProfile } from "../../services/utils/types";
// import { CustomZoom } from "../../components/customZoom/customZoom";

export default function MapPage() {
  const [ users, setUsers ] = useState<TProfile[]>([]);
  
  useEffect(() => {
    getCohortProfiles({offset: 0, limit: 12, cohort: 'web+16'})
      .then(res => setUsers(res.items))
      .catch(err => console.error(err))
  }, [])
  
  const defaultState = {
    center: [55.751574, 37.573856],
    zoom: 3
  };

  return (
    <YMaps query={{load: 'templateLayoutFactory', apikey: 'ba95eb1c-17e9-45f5-85d5-71bead610d20' }} >
      <Map defaultState={defaultState} width='100%' height='calc(100vh - 153px)' modules={['templateLayoutFactory']}  >
        {
          users && users.map(user => <CustomPlacemark user={user} key={user._id} />)
        }
        <ZoomControl options={{size: 'small', position: { top: 'calc((100vh - 214px)/2)', right: 8 }}} />
        {/* <CustomZoom /> */}
        <SearchControl />
        <RouteButton />
        <RulerControl />
        <TrafficControl />
      </Map>
    </YMaps>
  )
}