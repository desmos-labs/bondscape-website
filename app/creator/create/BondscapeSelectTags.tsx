"use client";
import React, { useCallback, useId, useState } from "react";
import { components } from "react-select";
import useCustomLazyQuery from "@/hooks/graphql/useCustomLazyQuery";
import { GQLEventTagsResult } from "@/types/event";
import GetTags from "@/services/graphql/queries/bondscape/GetTags";
import AsyncCreatableSelect from "react-select/async-creatable";

interface Props {
  readonly initialTags?: string[];
  readonly required: boolean;
  readonly onChange: (tags: string[]) => void;
}

const BondscapeSelectTags = ({ initialTags, required, onChange }: Props) => {
  const [loading, setLoading] = useState(false);

  const [getLazyData] = useCustomLazyQuery<GQLEventTagsResult>(GetTags, {
    fetchPolicy: "network-only",
  });

  const loadOptions = useCallback(
    async (input: string) => {
      setLoading(true);
      const data = await getLazyData({
        variables: {
          tag: `%${input}%`,
        },
      });
      setLoading(false);
      if (!data) return [];
      return data.event_tags
        .map((res: { tag: string }) => {
          return {
            id: res.tag,
            value: res.tag,
            label: res.tag,
          };
        })
        .filter((tag) => tag.id !== "");
    },
    [getLazyData],
  );

  return (
    <div className="flex flex-col bg-bondscape-text_neutral_100 rounded-[16px] px-[1rem]">
      <div className="flex flex-row items-center gap-2">
        <div className="flex gap-1 w-[130px]">
          <label className="text-[16px] text-bondscape-text_neutral_900">
            {"Tags"}
          </label>
          {required && <span className="text-[#FF8686]">*</span>}
        </div>
        <div className="flex flex-1">
          <AsyncCreatableSelect
            instanceId={useId()}
            value={initialTags?.map((tag) => {
              return {
                id: tag,
                value: tag,
                label: tag,
              };
            })}
            defaultOptions={true}
            isMulti={true}
            loadingMessage={() => "Loading..."}
            isLoading={loading}
            loadOptions={loadOptions}
            noOptionsMessage={() => "No tags found"}
            backspaceRemovesValue={true}
            onChange={(tags) => {
              if (tags) {
                onChange(tags.map((tag) => tag.value));
              } else {
                onChange([]);
              }
            }}
            placeholder={"Select tags"}
            components={{
              MultiValueContainer: (props) => (
                <div className="mb-1 mr-1">
                  <components.MultiValueContainer {...props} />
                </div>
              ),
              MultiValueLabel: (props) => (
                <components.MultiValueLabel {...props}>
                  <div className="text-[14px] font-[Poppins] mr-1 bg-[#353343] px-[0.5rem] py-[0.25rem] rounded-[1rem]">
                    {props.data.label}
                  </div>
                </components.MultiValueLabel>
              ),
              MultiValueRemove: (props) => (
                <components.MultiValueRemove {...props}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2 11.75C2 6.36522 6.36522 2 11.75 2C17.1348 2 21.5 6.36522 21.5 11.75C21.5 17.1348 17.1348 21.5 11.75 21.5C6.36522 21.5 2 17.1348 2 11.75ZM11.75 3.5C7.19365 3.5 3.5 7.19365 3.5 11.75C3.5 16.3063 7.19365 20 11.75 20C16.3063 20 20 16.3063 20 11.75C20 7.19365 16.3063 3.5 11.75 3.5Z"
                      fill="#A579FF"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.21967 8.21967C8.51256 7.92678 8.98744 7.92678 9.28033 8.21967L11.75 10.6893L14.2197 8.21967C14.5126 7.92678 14.9874 7.92678 15.2803 8.21967C15.5732 8.51256 15.5732 8.98744 15.2803 9.28033L12.8107 11.75L15.2803 14.2197C15.5732 14.5126 15.5732 14.9874 15.2803 15.2803C14.9874 15.5732 14.5126 15.5732 14.2197 15.2803L11.75 12.8107L9.28033 15.2803C8.98744 15.5732 8.51256 15.5732 8.21967 15.2803C7.92678 14.9874 7.92678 14.5126 8.21967 14.2197L10.6893 11.75L8.21967 9.28033C7.92678 8.98744 7.92678 8.51256 8.21967 8.21967Z"
                      fill="#A579FF"
                    />
                  </svg>
                </components.MultiValueRemove>
              ),
            }}
            styles={{
              menuList: (base) => ({
                ...base,
                "::-webkit-scrollbar": {
                  width: "12px",
                },
                "::-webkit-scrollbar-track": {
                  background: "#4B4A58",
                },
                "::-webkit-scrollbar-thumb": {
                  background: "#73708A",
                  borderRadius: "20px",
                },
              }),
            }}
            className="w-full rounded-[8px] bg-bondscape-text_neutral_200 px-[0.75rem] font-[Poppins] leading-[1.3rem]"
            classNames={{
              menu: () => {
                return "rounded-[16px] bg-bondscape-text_neutral_200 mt-2 p-[1rem]";
              },
              option: (props) => {
                return props.isSelected
                  ? "text-[16px] bg-bondscape-text_neutral_300 text-bondscape-text_neutral_900 p-[1rem] rounded-[16px]"
                  : "text-[16px] text-bondscape-text_neutral_900 p-[1rem]";
              },
              control: (props) => {
                return props.hasValue
                  ? "text-[14px] text-bondscape-text_neutral_900 py-[0.75rem]"
                  : "text-[14px] text-bondscape-text_neutral_600 py-[0.75rem]";
              },
            }}
            unstyled
          />
        </div>
      </div>
    </div>
  );
};

export default BondscapeSelectTags;
