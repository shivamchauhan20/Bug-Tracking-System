class BasicSalary{
    public static void main(String args[]){
    
        double bs=Double.parseDouble(args[0]);
        double hra=Hra(bs);
        double da=Da(bs);
        double ta=Ta(bs);
        double pf=Pf(bs);
        double gs=bs+hra+da+ta-pf;
        double tax=Tax(gs);
        double ns=gs-tax;
        System.out.println("HRA is "+hra);
        System.out.println("DA is "+da);
        System.out.println("TA is "+ta);
        System.out.println("PF is "+pf);
        System.out.println("GS is "+gs);
        System.out.println("TAX is "+tax);
        System.out.println("Net Salary is "+ns);
    
    }
         static double Hra(double n){
            return n*0.3;
            
        }
         static double Da(double n){
            return n*0.2;
                   }
        static double Ta(double n){
            return n*0.1;
                }
         static double Pf(double n){
            return n*0.05;
            }
         static double Tax(double n){
            return n*0.1;
        }
    
}