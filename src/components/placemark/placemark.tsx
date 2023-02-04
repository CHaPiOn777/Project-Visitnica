import { Placemark, useYMaps } from "@pbe/react-yandex-maps";
import { TProfile } from "../../services/utils/types";
import pin from '../../images/pin.svg';
import styles from './placemark.module.css'
import LoadingIcon from "../loading-icon/loading-icon";

export function CustomPlacemark({ user }: {user: TProfile}) { 
  const getCoordinates = (arr: Array<string>) => {
    const newArr = arr.map(el => parseFloat(el));
    return newArr;
  }
  
  const ymaps = useYMaps(['templateLayoutFactory']);
  
  const iconLayout = ymaps ? ymaps.templateLayoutFactory.createClass(
    `<div class=${styles.container}>
      <img src=${pin} />
      <div class=${styles.info}>
        <img src=${user.profile.photo} class=${styles.ava} />
        <p class=${styles.name}>${user.profile.name}</p>
        <p class=${styles.city}>${user.profile.city.name}</p>
      </div>
    </div>`
  ) : 'Загрузка' //

  return (
      user ? 
      <Placemark 
        geometry={getCoordinates(user.profile.city.geocode)}
        options={{
          iconLayout: iconLayout,
          iconOffset: [ -30, -68 ]
        }}
      />
      : <LoadingIcon />
  )
}

// const makeLayout = (layoutFactory, component, contentKey) => {
//   const Layout = layoutFactory.createClass('<div>ff</div>', {
//     build: function() {
//       Layout.superclass.build.call(this);
//       console.log(this)
//       Layout.updateReactTree = () => ReactDOM.unstable_renderSubtreeIntoContainer(
//         component,
//         <div>{component.props[contentKey]}</div>,
//         this.getElement().querySelector('div'),
//       );

//       Layout.updateReactTree();
//     },
//     clear: function() {
//       Layout.updateReactTree = null;
//       Layout.superclass.clear.call(this);
//     },
//   });
//   return Layout;
// };