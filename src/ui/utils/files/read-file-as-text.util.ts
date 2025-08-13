type TReadFileAsTextProps = {
  file: File;
  encoding?: string;
};

export const readFileAsText = ({ file, encoding = 'UTF-8' }: TReadFileAsTextProps) => {
  return new Promise<string | ArrayBuffer | null | undefined>(resolve => {
    const fileReader = new FileReader();

    fileReader.readAsText(file, encoding);
    fileReader.onload = fileReaderEvent => {
      resolve(fileReaderEvent.target?.result);
    };
  });
};
