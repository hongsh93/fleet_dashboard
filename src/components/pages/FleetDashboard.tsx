import { useEffect, useState } from "react"
import Pagination from "@mui/material/Pagination"

import { Location } from "../../mocks/db"
import FleetTable from "../organisms/FleetTable"
import SearchBar from "../organisms/SearchBar"

export interface LocationWithStarred extends Location{
	is_starred?: boolean
}

const FleetDashboard = () => {
	const [data, setData] = useState<LocationWithStarred[]>([])
	const [searchString, setSearchString] = useState("")
	const [searchStarred, setSearchStarred] = useState(false)
	const [page, setPage] = useState(1)
	const [refresh, setRefresh] = useState(false)
	const [totalCount, setTotalCount] = useState(0)

	const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value)
	}
	useEffect(() => {
		const fetchData = async () => {
			const locationQueryString = [
				`page=${page}`,
				`search_string=${searchString}`,
				`is_starred=${searchStarred}`
			].join("&")

			const [responseLocation, responseStarred] = await Promise.all([fetch(`/locations?${locationQueryString}`), fetch("/starred_location_ids")])
			const [resultLocation, resultStarred] = await Promise.all([responseLocation.json(), responseStarred.json()])

			const locations = resultLocation.locations.slice()
			const starred_ids = resultStarred.location_ids.slice()
			locations.forEach((location: LocationWithStarred) => {
        const starredKey = "is_starred"
        if (starred_ids.includes(location.id)) {
          location[starredKey] = true
        }
        else {
          location[starredKey] = false
        }
      })
			setData(locations)
			setTotalCount(resultLocation.total_count)
		}
		
		fetchData()
	}, [page, searchString, searchStarred, refresh])

	return (
		<div>
			<h1>Your Fleet</h1>
			<SearchBar setSearchStarred={setSearchStarred} setSearchString={setSearchString} />
			<FleetTable data={data} totalCount={totalCount} setRefresh={setRefresh}/>
			<div style={{ display: "flex", justifyContent: "center", marginTop: "16px"}}>
				<Pagination count={Math.ceil(totalCount/6)} color="primary" onChange={handlePageChange}/>
			</div>
		</div>
	)
}
export default FleetDashboard