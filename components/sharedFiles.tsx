import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import { useShared } from "@/store/files"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "./ui/progress"

type CardProps = React.ComponentProps<typeof Card>

const SharedList = ({ className, ...props }: CardProps) => {

  const sharedFiles = useShared(s => s.SharedFiles);
  const count = useShared(s => s.count)


  return (
    <Card className={cn("w-full text-center", className)} {...props}>
      <Tabs defaultValue="All" className="w-full">
        <CardHeader>
          <TabsList className="grid w-full grid-cols-3 bg-slate-900 bg-opacity-60">
            <TabsTrigger value="All">All</TabsTrigger>
            <TabsTrigger value="Send">Send</TabsTrigger>
            <TabsTrigger value="Recieved">Recieved</TabsTrigger>
          </TabsList>
        </CardHeader>

        <TabsContent value="All" className="text-white"><CardDescription className="text-center"><List files={sharedFiles} /></CardDescription></TabsContent>
        <TabsContent value="Send" className="text-white"><CardDescription className="text-center"><List files={sharedFiles} send={true} /></CardDescription></TabsContent>
        <TabsContent value="Recieved" className="text-white"><CardDescription className="text-center"><List files={sharedFiles} recieve={true} /></CardDescription></TabsContent>

      </Tabs>
    </Card>
  )
}

export default SharedList

const List = ({ files, send, recieve }: { files: SharedFile[], send?: boolean, recieve?: boolean }) => {
  return (
    <CardContent className="grid gap-4 w-full overflow-y-scroll h-[69vh] mb-[2vh]">
      <div>
        {files.map((file) => {
          const filesize = (file.size > 10e5 ? `${Math.ceil(file.size / 10e5)}MB` : `${Math.ceil(file.size / 10e2)}KB`)
          const currentSize = (((file.progress * file.size) / 100) > 10e5 ? `${Math.ceil(((file.progress * file.size) / 100) / 10e5)}MB` : `${Math.ceil(((file.progress * file.size) / 100) / 10e2)}KB`)

          if (recieve && file.sendByMe) {
            return;
          }
          if (send && !file.sendByMe) {
            return;
          }
          return (
            <div
              key={file.id}
              className=" mb-4 bg-gray-700 bg-opacity-20 backdrop-blur-3xl  rounded-md overflow-hidden relative"
            >
              <div className="space-y-1 flex flex-row justify-between items-center m-4">
                <p className="text-sm text-white font-light leading-tight text-ellipsis overflow-hidden whitespace-nowrap max-w-[200px] sm:max-w-full">
                  {file.name}
                </p>
                <p className="text-sm text-gray-400 min-w-fit">
                  {file.status ? `✔️` :`${currentSize} / ${filesize}`}
                </p>
              </div>
            <Progress value={file.progress} className={`rounded-none h-full bg-transparent opacity-50 ${file.status ? 'hidden' : ''} absolute top-0 -z-10`} />
            </div>
          )
        })}
      </div>
    </CardContent>
  )
}