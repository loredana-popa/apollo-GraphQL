import React from 'react'
import { useParams } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'

import Layout from '../components/layout'
import QueryResult from '../components/query-result'
import TrackDetail from '../components/track-detail'

export const GET_TRACK = gql`
	query GetTrack($trackId: ID!) {
		track(id: $trackId) {
			id
			title
			author {
				id
				name
				photo
			}
			thumbnail
			length
			modulesCount
			description
			numberOfViews
			modules {
				id
				title
				length
			}
		}
	}
`
/**
 * Track Page fetches a track's data from the gql query GET_TRACK
 * and provides it to the TrackDetail component to display
 */
const Track = () => {
	const { trackId } = useParams()
	const { loading, error, data } = useQuery(GET_TRACK, {
		variables: { trackId },
	})
	return (
		<Layout>
			<QueryResult loading={loading} error={error} data={data}>
				<TrackDetail track={data?.track} />
			</QueryResult>
		</Layout>
	)
}

export default Track
