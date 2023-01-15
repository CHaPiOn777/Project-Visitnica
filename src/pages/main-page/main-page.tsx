import { useEffect } from "react";
import { Link } from "react-router-dom";
import getCohortProfiles from "../../services/utils/api/get-cohort-profiles";

export default function MainPage () {
  
  useEffect(() => {
    getCohortProfiles().then((res) => {
      console.log(res);
    })
  })
  
  return (
    <main>
      <div>
        <Link to='/'>Посмотреть на карте</Link>
      </div>
      <div>

      </div>
    </main>
  )
}