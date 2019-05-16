import React from "react";
import styled from "styled-components";

const borderRadius = "10px";

const StyledCard = styled.div`
	width: 200px;
	height: 200px;
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

const StyledCardImage = styled.img`
  width: inherit;
  height: inherit;
  object-fit: cover;
  border-radius: ${borderRadius} ${borderRadius} 0 0;

  // Flex Details 
`;

const StyledCardDetails = styled.div`
	height: 25%;
  border-radius: 0 0 ${borderRadius} ${borderRadius};
  // background-color: grey;
  // border: 1px solid grey;
  border-top: none;

  // Vertical Flex for section below image
  display: flex;
  flex-direction:row
`;

const TrackDetails = styled.div`
	flex: 75%;
	background-color: aqua;
	object-fit: cover;
	z-index: -1;
	border-radius: 0 0 0 ${borderRadius};


	// Padding for Text
 	 padding: 2px 16px;

 	 // Vertical Flex Container for Text
 	 display: flex;
 	 flex-direction:column;
 	 justify-content: space-around;
 	 align-items: flex-start;

`
const SoundcloudButton = styled.div`
	flex: 25%;
	background-color: orange;
	object-fit: cover;
	z-index: -1;
	border-radius: 0 0 ${borderRadius} 0};
`

const StyledText = styled.span`
	font-size: 12px;
	margin: 0;
`

const icon = styled.i`
	height:100%;
	margin-top:auto;
	margin-bottom:auto;
`
export const Card = props => {
  const { imageSrc, trackTitle, trackArtist } = props;

  return (
    <StyledCard>
      <StyledCardImage src={imageSrc} />
      <StyledCardDetails>
      	<TrackDetails>
      		<StyledText style={{order: 2}}> {trackTitle} </StyledText>
      		<StyledText style={{order: 2}}> {trackArtist} </StyledText>
      	</TrackDetails>
      	<SoundcloudButton>
      	 <span>
              <icon className="fab fa-soundcloud"/>
            </span>
      	</SoundcloudButton>

      </StyledCardDetails>
    </StyledCard>
  );
};
