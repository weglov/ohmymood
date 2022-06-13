import {
  HeaderSkeleton,
  Skeleton,
  TextSkeleton,
  VStack,
} from "@revolut/ui-kit";

export const FormSkeleton = () => {
  return (
    <VStack space="s-16">
      <HeaderSkeleton variant="main" />
      <Skeleton height="50px" />
      <TextSkeleton variant="h2" size={8} />
      <Skeleton />
    </VStack>
  );
};
