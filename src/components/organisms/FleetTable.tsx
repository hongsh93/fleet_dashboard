import { Dispatch, SetStateAction } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import RefreshIcon from '@mui/icons-material/Refresh';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CircleIcon from '@mui/icons-material/Circle';

import { LocationWithStarred } from '../pages/FleetDashboard';
import Button from '@mui/material/Button';

interface fleetTableProps {
	data: LocationWithStarred[]
	totalCount: number
	setRefresh: Dispatch<SetStateAction<boolean>>
}

const FleetTable = ({ data, totalCount, setRefresh }: fleetTableProps) => {
	const handleClickStarred = async (is_starred: boolean, id: number) => {
		await fetch("/starred_location_ids", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				id,
				will_stare: !is_starred
			})
		})
		setRefresh(prevRefresh => !prevRefresh)
	}

	const columns = [
		{
			field: 'is_starred',
			headerName: 'is_starred',
			width: 60,
			editable: false,
			renderHeader: () => {
				return (
					<RefreshIcon onClick={() => setRefresh(prevRefresh => !prevRefresh)} />
				)
			},
			renderCell: (row: any) => {
				if (row?.value === true) {
					return (
						<StarOutlinedIcon style={{color: "#F7B500"}} onClick={() => handleClickStarred(row.value, row.id)} />
					)
				} else {
					return (
						<StarBorderOutlinedIcon onClick={() => handleClickStarred(row.value, row.id)} />
					)
				}
			},
			sortable: false
		},
		{
			field: 'name',
			headerName: 'Location',
			width: 300,
			editable: false,
			renderCell: (row: any) => {
				return (
					<div style={{width: "100%"}}>
						<Button variant="contained" disabled={!row.row.robot} sx={{ width: "100%", paddingLeft: "36px" }}>
							<div style={{ flex: 1 }}>{row.row.name}</div>
								<ArrowForwardIosIcon fontSize="small" />
						</Button>
					</div>
				)
			},
		},
		{
			field: 'robot',
			headerName: 'Robots',
			width: 150,
			editable: false,
			valueFormatter: (row: any) => {
				if (row?.value?.id) return row?.value?.id
			},
			renderCell: (row: any) => {
				if (row?.value?.id) {
					return (
						<div style={{ display: "flex", alignItems: "center" }}>
							<CircleIcon style={{ fontSize: "14px", color: "#00D15E", marginRight: "8px" }} />
							<span>{row?.value?.id}</span>
						</div>
					)
				}
				else {
					return <div style={{ color: "#3961F8", textDecoration: "underline", cursor: "pointer" }}>Add</div>
				}
			},
		},
	]
	return (
    <div style={{ width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
				pageSizeOptions={[6]}
				rowCount={totalCount}
				checkboxSelection
				disableColumnMenu
				disableRowSelectionOnClick
				hideFooter
      />
    </div>
  );
}
export default FleetTable