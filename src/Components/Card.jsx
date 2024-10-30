import { useEffect, useState } from "react";
import CardDetail from "./Modal/CardDetail";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCards, moveCard } from "../Services/Board";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";
import checklistIcon from "../Assets/Images/checklist.svg";

const Card = (props) => {
  const queryClient = useQueryClient();

  //States
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);

  //Handlers
  const handleDragStart = (e, card) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(card));
  };

  const handleDragEnd = () => {};

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetCard) => {
    e.preventDefault();
    const sourceCard = JSON.parse(e.dataTransfer.getData("text/plain"));

    if (targetCard?.list_id === sourceCard.list_id) {
      return;
    }
    moveCardMutation.mutate({
      sourceCardId: sourceCard.id,
      targetListId: targetCard.list_id,
    });
  };

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

  const moveCardMutation = useMutation({
    mutationFn: ({ sourceCardId, targetListId }) =>
      moveCard(sourceCardId, targetListId, props.jwt),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["cards"],
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error("An error occured. Please try again later.");
    },
  });

  //Effects
  useEffect(() => {
    if (!cardsLoading && cardsData) {
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
            draggable={true}
            onDragStart={(e) => handleDragStart(e, card)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, card)}
            title="Click to open"
            onClick={() => setSelectedCard(card)}
            className="min-h-14 max-w-[268px] cursor-pointer rounded-md bg-[#5c677d] p-2 text-white transition-all duration-300 ease-in-out hover:scale-105"
          >
            <span>{card.title}</span>
            <p className="mt-1 text-wrap text-sm text-white/80">
              {card.description}
            </p>
            {card.total_checklist_items > 0 ? (
              <div className="flex items-center justify-start gap-2">
                <img
                  src={checklistIcon}
                  alt="checklist-icon"
                  className="h-5 w-5"
                />
                <span className="font-semibold">
                  {card.completed_items + "/" + card.total_checklist_items}
                </span>
                <div className="h-2 w-full rounded-md bg-white/80">
                  <div
                    style={{
                      width: `${
                        (card.completed_items * 100) /
                        card.total_checklist_items
                      }%`,
                    }}
                    className="h-2 rounded-md bg-green-500"
                  />
                </div>
              </div>
            ) : (
              ""
            )}
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
