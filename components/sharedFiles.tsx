import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import { useShared } from "@/store/files"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type CardProps = React.ComponentProps<typeof Card>

const SharedList = ({ className, ...props }: CardProps) => {

  const sharedFiles = useShared(s => s.SharedFiles);
  const count = useShared(s => s.count)


  return (
    <Card className={cn("w-full text-center", className)} {...props}>
      <CardHeader>
        <Tabs defaultValue="All" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-900 bg-opacity-60">
            <TabsTrigger value="All">All</TabsTrigger>
            <TabsTrigger value="Send">Send</TabsTrigger>
            <TabsTrigger value="Recieved">Recieved</TabsTrigger>
          </TabsList>
          <TabsContent value="All" className="text-white"><CardDescription className="text-center">{count} files shared over this connection</CardDescription></TabsContent>
          <TabsContent value="Send" className="text-white"><CardDescription className="text-center">not active right now</CardDescription></TabsContent>
          <TabsContent value="Recieved" className="text-white"><CardDescription className="text-center">not active right now</CardDescription></TabsContent>
        </Tabs>

      </CardHeader>
      <CardContent className="grid gap-4 w-full overflow-y-scroll h-[69vh] mb-[2vh]">
        <div>
          {sharedFiles.map((file) => {
            const filesize = (file.size > 10e5 ? `${Math.ceil(file.size / 10e5)}MB` : `${Math.ceil(file.size / 10e2)}KB`)
            return (
              <div
                key={file.id}
                className="mb-4 grid grid-cols-[25px_1fr] pb-4 last:mb-0 last:pb-0"
              >
                <span className={`flex h-4 w-4 translate-y-1 rounded-full  ${file.status ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`} />
                <div className="space-y-1 flex flex-row justify-between items-center">
                  <p className="text-sm text-white font-medium leading-none">
                    {file.name}
                  </p>
                  <p className="text-sm text-gray-400">
                    {filesize}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default SharedList