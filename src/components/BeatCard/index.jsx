import React from 'react';
import styled from 'styled-components';

const borderRadius = '10px';


// Whole Card
const StyledCard = styled.div`
	width: 200px;
	height: auto;
	cursor: pointer;
	// background-color: grey;
	&:hover {
		transform: scale(1.1, 1.1);
		box-shadow:  0 8px 16px 0 rgba(0,0,0,0.2);,
	}
	  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.1s;
  border-radius: ${borderRadius}; /* 5px rounded corners */

  // Vertical Flex for Entire Card
  display: flex
  flex-direction:column
`;

// Image
const StyledCardImage = styled.img`
	width: 200px;
	height: 200px;
	object-fit: cover;
	border-radius: ${borderRadius} ${borderRadius} 0 0;

	// Flex Details
`;

// Contains all Track Data eg. Artist Name Soundclodu Button
const StyledCardDetails = styled.div`
	height: 25%;
	border-radius: 0 0 ${borderRadius} ${borderRadius};
	// background-color: grey;
	// border: 1px solid grey;
	border-top: none;

	// Vertical Flex for section below image
	display: flex;
	flex-direction: column;
`;

// Just Artist Name
const TrackDetails = styled.div`
	flex: 75%;
	background-color: aqua;
	object-fit: cover;
	z-index: -1;
	border-radius: 0 0 0 0;

	// Padding for Text
	padding: 2px 16px;

	// Vertical Flex Container for Text
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: flex-start;
`;

// Soundcloud link CTA
const SoundcloudButton = styled.button`
	flex: 25%;
	background-color: orange;
	object-fit: cover;
	z-index: 1;
	border-radius: 0 0 ${borderRadius} ${borderRadius}};

	&:hover {
		color: white;
		box-shadow:  0 8px 16px 0 rgba(0,0,0,0.2);,
	}
`;

// Text
const StyledText = styled.span`
	font-size: 12px;
	margin: 0;
`;
// SC Icon
const Icon = styled.i`
	height:100%;
	margin-top:auto;
	margin-bottom:auto;
`;
export const Card = props => {
	const { imageSrc, trackTitle, trackArtist, trackURL } = props;

	return (
		<StyledCard>
			<StyledCardImage src={imageSrc} />
			<StyledCardDetails>
				<TrackDetails>
					<StyledText> {trackTitle} </StyledText>
					<StyledText> {trackArtist} </StyledText>
				</TrackDetails>
					<SoundcloudButton
						onClick={() => {
							alert('link to track');
						}}
					>
						<Icon className="fab fa-soundcloud" />
					</SoundcloudButton>
			</StyledCardDetails>
		</StyledCard>
	);
};
