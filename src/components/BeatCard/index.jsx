import React from 'react';
import styled from 'styled-components';

const borderRadius = '10px';

// Whole Card
const StyledCardContainer = styled.div`
	width: 200px;
	height: auto;
	cursor: pointer;
	// background-color: grey;
	&:hover {
		transform: scale(0.9, 0.9);
		box-shadow:  0 8px 16px 0 rgba(0,0,0,0.2);,
	}
	  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.1s;
  border-radius: ${borderRadius}; /* 5px rounded corners */

  // Vertical Flex for Entire Card
  display: flex
  flex-direction:column
`;

//
const CardImageContainer = styled.div`
	position: relative;
	width: 200px;
	height: 200px;
`;

// Image
const CardImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
	border-radius: ${borderRadius} ${borderRadius} 0 0;
	// Flex Details
`;

// Image overlay

const CardImageOverlay = styled.div`
	position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 25%;
    // display: none;
    color: #FFF;
    background: rgba(0, 0, 0, .4);
    z-index: 2
}
`;


const InvisibleOverlay = styled.div`
	position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0);
    z-index: 1
}
`;

// Contains all Track Data eg. Artist Name Soundclodu Button
const CardDetailsContainer = styled.div`
	// Vertical Flex for section below image
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	height: 100%
`;



// Soundcloud link CTA
const SoundcloudButton = styled.a`
	flex: 25%;
  	background-color: #ff7700 !important;
  	color: white;
	object-fit: cover;
	z-index: 1;
	border-radius: 0 0 ${borderRadius} ${borderRadius}};
	&:hover {
		color: white;
		box-shadow:  0 8px 16px 0 rgba(0,0,0,0.4);,
	}

	display: flex;
	flex-flow: row nowrap;
	justify-content: center;
`;

// Text
const StyledText = styled.p`
	font-size: 12px;
	margin: 0;
	text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-family: "Poppins", sans-serif;
`;

// SC Icon
const Icon = styled.i`
	height: auto;
	margin-top: auto;
	margin-bottom: auto;	
	width: 25%;
	flex-shrink: 0;
	flex-grow: 0;
`;

// Just Artist Name
const TrackDetails = styled.div`
	width: 75%;
	// background-color: aqua;
	object-fit: cover;
	border-radius: 0 0 0 0;

	height

	// Padding for Text
	// padding: 2px 16px;

	// Vertical Flex Container for Text
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
`;
export const Card = props => {
	const { imageSrc, trackTitle, trackArtist, trackURL } = props;

	return (
		<StyledCardContainer>
			<CardImageContainer>
				<CardImage src={imageSrc} />
				<InvisibleOverlay id="INVISIBLE_OVERLAY"/> 
				<CardImageOverlay id="OVERLAY">
				 	<CardDetailsContainer> 
				 	<Icon>
				 	{props.renderedPlayButton}
				 	</Icon>
					<TrackDetails>
						<StyledText> {trackTitle} </StyledText>
						<StyledText> {trackArtist} </StyledText>
					</TrackDetails>
					</CardDetailsContainer>
				</CardImageOverlay>
			</CardImageContainer>
				<SoundcloudButton href={trackURL}>
					<Icon className="fab fa-soundcloud" />
					<StyledText> Listen on Soundcloud </StyledText>
				</SoundcloudButton>
		</StyledCardContainer>
	);
};
