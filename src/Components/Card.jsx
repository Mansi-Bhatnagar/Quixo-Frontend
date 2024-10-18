import { useEffect, useState } from "react";
import CardDetail from "./Modal/CardDetail";
import { useQuery } from "@tanstack/react-query";
import { getCards } from "../Services/Board";
import Skeleton from "react-loading-skeleton";

const Card = (props) => {
  //States
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);

  //APIs
  const {
    data: cardsData,
    isLoading: cardsLoading,
    error: cardsError,
  } = useQuery({
    queryKey: ["cards", props.listId],
    queryFn: () => getCards(props.listId, props.jwt),
    enabled: !!props.listId && !!props.jwt,
  });

  //Effects
  useEffect(() => {
    if (!cardsLoading && cardsData) {
      console.log(cardsData);
      setCards(cardsData?.data);
    } else if (cardsError) {
      console.error(cardsError);
    }
  }, [cardsData, cardsLoading, cardsError]);

  return (
    <div className="flex flex-col space-y-2">
      {cardsLoading ? (
        <Skeleton
          count={3}
          height={56}
          baseColor={"#1d2125"}
          highlightColor={"#5c677d"}
          className="!rounded-md"
        />
      ) : (
        ""
      )}
      {cards?.map((card) => {
        return (
          <div
            key={card.id}
            title="Click to open"
            onClick={() => setSelectedCard(card)}
            className="min-h-14 cursor-pointer rounded-md bg-[#5c677d] p-2 text-white transition-all duration-300 ease-in-out hover:scale-105"
          >
            <span>{card.title}</span>
            <p className="mt-1 text-justify text-sm text-white/80">
              {card.description}
            </p>
          </div>
        );
      })}
      {selectedCard && (
        <CardDetail
          open={!!selectedCard}
          onClose={() => setSelectedCard(null)}
          card={selectedCard}
          jwt={props.jwt}
        />
      )}
    </div>
  );
};

export default Card;
