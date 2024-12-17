{
val hashesFromContextVar = getVar[Coll[Coll[Byte]]](0).get
val fullList = getVar[Coll[Byte]](0).get
val specificHash = hashesFromContextVar(5)

val combinedRegistersHash = blake2b256(
SELF.R4[Coll[Byte]].get ++
SELF.R5[Coll[Byte]].get ++
SELF.R6[Coll[Byte]].get ++
SELF.R7[Coll[Byte]].get ++
SELF.R8[Coll[Byte]].get ++
SELF.R9[Coll[Byte]].get
)

val listHash = blake2b256(Coll(1.toByte, 2.toByte, 3.toByte, 4.toByte))

sigmaProp(
combinedRegistersHash == specificHash &&
blake2b256(fullList) == listHash
)
}
