import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SpellTable from './SpellTable'
import MonsterTable from './MonsterTable'


const ResourceTableTabs = () => {
  return (
    <Tabs defaultValue="spells" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="spells">Spells
    </TabsTrigger>
    <TabsTrigger value="monsters">Monsters</TabsTrigger>
  </TabsList>
  <TabsContent value="spells">List Of Spells
  <SpellTable endpoint='dnd/spells'/>
  </TabsContent>
  <TabsContent value="monsters">List Of Monsters
  <MonsterTable endpoint='dnd/monsters'/>
  </TabsContent>
</Tabs>
  )
}

export default ResourceTableTabs