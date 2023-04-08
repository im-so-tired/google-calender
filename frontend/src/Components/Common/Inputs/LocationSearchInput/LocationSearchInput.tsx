import React, { FC } from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'

interface LocationInputProps {
	location: string
	setLocation: ((value: string) => void) | undefined
	selectLocation: ((address: string, placeID: string) => void) | undefined
}

const LocationSearchInput: FC<LocationInputProps> = ({
	location,
	setLocation,
	selectLocation,
}) => {
	return (
		<div>
			<PlacesAutocomplete
				value={location}
				onChange={setLocation}
				onSelect={selectLocation}
				debounce={500}
				searchOptions={{ types: ['(cities)'] }}
			>
				{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
					<div>
						<input
							{...getInputProps({
								placeholder: 'Add location',
								className: 'location-search-input',
							})}
						/>
						<div className="autocomplete-dropdown-container">
							{loading && <div>Загрузка...</div>}
							{suggestions.map(suggestion => {
								const className = suggestion.active
									? 'suggestion-item--active'
									: 'suggestion-item'
								const style = suggestion.active
									? { backgroundColor: '#fafafa', cursor: 'pointer' }
									: { backgroundColor: '#ffffff', cursor: 'pointer' }
								return (
									<div
										{...getSuggestionItemProps(suggestion, {
											className,
											style,
										})}
									>
										<span>{suggestion.description}</span>
									</div>
								)
							})}
						</div>
					</div>
				)}
			</PlacesAutocomplete>
		</div>
	)
}

export default LocationSearchInput
