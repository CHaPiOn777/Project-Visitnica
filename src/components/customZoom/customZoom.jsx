import { useYMaps, ZoomControl } from "@pbe/react-yandex-maps";
import styles from './customZoom.module.css'

export function CustomZoom() {
  const ymaps = useYMaps(['templateLayoutFactory']);
  
  const zoomLayout = ymaps && ymaps.templateLayoutFactory.createClass(
    `<div class=${styles.container}>
      <button class='${styles.btn_top} ${styles.btn}'><svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11 5.992c0-.537.448-.992 1-.992.556 0 1 .444 1 .992V11h5.008c.537 0 .992.448.992 1 0 .556-.444 1-.992 1H13v5.008c0 .537-.448.992-1 .992-.556 0-1-.444-1-.992V13H5.992C5.455 13 5 12.552 5 12c0-.556.444-1 .992-1H11V5.992z" fill="currentColor"></path></svg></button>
      <button class='${styles.btn_bottom} ${styles.btn}'><svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 12a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1z" fill="currentColor"></path></svg></button>
    </div>`,
    {
      build: function () {
        zoomLayout.superclass.build.call(this);
        this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
        this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);
        
        document.querySelector(`.${styles.btn_top}`).bind('click', this.zoomInCallback); //вот это вот дело не работает
        document.querySelector(`.${styles.btn_bottom}`).bind('click', this.zoomOutCallback);
        
      },

      clear: function () {
        document.querySelector(`.${styles.btn_top}`).unbind('click', this.zoomInCallback);
        document.querySelector(`.${styles.btn_bottom}`).unbind('click', this.zoomOutCallback);
        zoomLayout.superclass.clear.call(this);
      },

      zoomIn: function () {
        const map = this.getData().control.getMap();
        map.setZoom(map.getZoom() + 1, {checkZoomRange: true});
      },

      zoomOut: function () {
        const map = this.getData().control.getMap();
        map.setZoom(map.getZoom() - 1, {checkZoomRange: true});
      }
    }
  )

  return (
      <ZoomControl 
        options={{
          layout: zoomLayout
        }}
      />
  )
}