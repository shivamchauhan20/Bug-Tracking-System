class Array{
    public static void main(String args[]){
        int b[][]=new int[3][5];
          for(int i[]:b)
           {
               for(int j:i){
                   System.out.print(j+"  ");
               }
               System.out.println();
           } 
       outer:
       for(int i=1;i<=3;i++){
           for(int j=1;j<=3;j++){
               if(i==j){
                   continue outer;
               }
               System.out.println("I is "+i+" J is "+j);
           }
       }    
            }
}