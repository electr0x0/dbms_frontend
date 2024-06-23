import db from '../../../../../data/fakedb/facilitylist'

import FacilityList from '@views/admin/manage_facility/list/'

const ManageFacilityPage = () => {
  return <FacilityList userData={db} />
}

export default ManageFacilityPage
