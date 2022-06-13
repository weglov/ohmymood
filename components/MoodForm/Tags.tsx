import { Box, FilterButton, Flex, Skeleton, Subheader } from "@revolut/ui-kit";
import { Mood, useTagsQuery } from "../../api/generated/graphql";
import { useMoodForm } from "../../providers";

type Props = {
  mood: Mood;
};

export const Tags = ({ mood }: Props) => {
  const { data, loading } = useTagsQuery();
  const { tags, updateMood } = useMoodForm();

  if (loading) {
    return <Skeleton />;
  }

  const filteredTags = data.tags.filter((tag) =>
    tag.availableAt.includes(mood)
  );

  const onTagClick = (tag: string) => {
    if (tags.includes(tag)) {
      updateMood({ tags: tags.filter((t) => t === tag) });
      return;
    }

    updateMood({ tags: [...tags, tag] });
  };

  return (
    <Box>
      <Subheader>
        <Subheader.Title>Why it was {mood}?</Subheader.Title>
      </Subheader>
      <Flex gap="s-8" flexWrap="wrap">
        {filteredTags.map((tag) => (
          <FilterButton
            active={tags.includes(tag.name)}
            onClick={() => onTagClick(tag.name)}
            key={tag.id}
          >
            {tag.name}
          </FilterButton>
        ))}
      </Flex>
    </Box>
  );
};
