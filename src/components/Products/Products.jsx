import { Helmet } from 'react-helmet'
import RecentProducts from '../Home/components/RecentProducts/RecentProducts'

export default function Products() {
  return (
    <>
    <Helmet>
    <title>Products</title>
  </Helmet>
<div className="p-5">
<RecentProducts/>
</div>
    </>
  )
}
