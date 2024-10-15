import React, { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { addCard, addList, getLists } from "../Services/Board";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import AddCard from "./AddCard";
import Card from "./Card";

const List = (props) => {
  const queryClient = useQueryClient();
  //States
  const [lists, setLists] = useState([]);
  const [name, setName] = useState("");
  const [activeList, setActiveList] = useState(null);

  //Handlers
  const addListHandler = () => {
    if (name.trim() === "") {
      return;
    }
    addListMutation.mutate();
  };

  const addCardHandler = (listId, title) => {
    setActiveList(listId);
    console.log(title, listId);
    addCardMutation.mutate({ listId, title });
  };

  //APIs
  const addListMutation = useMutation({
    mutationFn: () => addList(+props.boardId, name, props.jwt),
    onSuccess: (response) => {
      setName("");
      queryClient.invalidateQueries({ queryKey: ["lists"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const {
    data: listsData,
    isLoading: listsLoading,
    error: listsError,
  } = useQuery({
    queryFn: () => getLists(+props.boardId, props.jwt),
    queryKey: ["lists", props.boardId, props.jwt],
    enabled: props.jwt !== "",
  });

  const addCardMutation = useMutation({
    mutationFn: ({ listId, title }) => addCard(listId, title, props.jwt),
    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: ["lists", props.boardId, props.jwt],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (!listsLoading && listsData) {
      setLists(listsData?.data);
    } else if (listsError) {
      console.log(listsError);
    }
  }, [listsData, listsLoading, listsError]);

  return (
    <div className="p-4">
      <div className="flex space-x-4">
        {listsLoading ? (
          <div className="[&>span]:flex [&>span]:gap-3">
            <Skeleton
              count={4}
              height={100}
              width={300}
              baseColor={"#1d2125"}
              highlightColor={"#5c677d"}
              className="!rounded-md"
            />
          </div>
        ) : (
          <>
            {lists?.map((list) => (
              <div
                key={list.id}
                className="max-h-[calc(100vh_-_140px)] border-y-8 border-y-transparent h-fit overflow-y-auto no-scrollbar min-w-[300px] rounded-lg bg-[#1d2125] p-4 shadow-md"
              >
                <h2 className="mb-2 pl-1 text-base text-[#b6c2cf]">
                  {list.name}
                </h2>
                <div className="flex flex-col space-y-2 mb-2">
                  {list?.cards?.map((card) => (
                    <Card key={card.id} card={card} />
                  ))}
                  {addCardMutation.isPending && activeList === list.id ? (
                    <Skeleton
                      count={1}
                      height={56}
                      baseColor={"#1d2125"}
                      highlightColor={"#5c677d"}
                      className="!rounded-md"
                    />
                  ) : (
                    ""
                  )}
                </div>
                <AddCard onAddCard={addCardHandler} listId={list.id} />
              </div>
            ))}
          </>
        )}
        {addListMutation.isPending ? (
          <div className="[&>span]:flex [&>span]:gap-3">
            <Skeleton
              count={1}
              height={100}
              width={300}
              baseColor={"#1d2125"}
              highlightColor={"#5c677d"}
              className="!rounded-md"
            />
          </div>
        ) : (
          ""
        )}
        <div className="flex w-[250px] flex-col space-y-2 pr-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="New list name"
            className="rounded-md border border-[#97a4b2] px-3 py-2 focus:outline-none"
          />
          <button
            onClick={addListHandler}
            className="flex items-center justify-center gap-2 rounded-md bg-[#1d2125] px-4 py-2 text-white focus:outline-none"
          >
            <PlusIcon className="h-5 w-5" />
            Add List
          </button>
        </div>
      </div>
    </div>
  );
};

export default List;
