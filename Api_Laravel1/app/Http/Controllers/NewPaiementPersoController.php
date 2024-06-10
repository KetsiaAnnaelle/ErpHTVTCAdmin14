
namespace App\Http\Controllers;

use App\Models\NewPaiementPerso;
use Illuminate\Console\View\Components\Alert;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NewPaiementPersoController extends Controller
{
    /**
         * Display a listing of the resource.
         */
        public function index()
        {


        }

        public function seeNewPaiementPerso(string $id)
        {

          $newPaiement=NewPaiementPerso::find($id)
                  ->get();

            return response()->json($newPaiement);

        }

        public function show(string $id)
         {

            try {
                $newPaiement = DB::table('new_paiement_persos')
                    ->join('paiement_persos', 'paiement_persos.id', '=', 'new_paiement_persos.paiement_perso_id')
                    ->select('new_paiement_persos.id','new_paiement_persos.paiement_perso_id','new_paiement_persos.montantPerso','new_paiement_persos.created_at','paiement_persos.supprimer','paiement_persos.archiver')
                    ->where('new_paiement_persos.paiement_perso_id',$id)
                    ->where('paiement_persos.supprimer',0)
                    ->where('paiement_persos.archiver',0)
                    ->get();
                    \Log::info('New Paiement:', $newPaiement->toArray());
                return response()->json($newPaiement->toArray());
            } catch (\Throwable $e) {
                \Log::error($e);
                return response()->json(['error' => $e->getMessage()], 500);
            }

         }

        /**
         * Show the form for creating a new resource.
         */
        public function create()
        {

        }

        /**
         * Store a newly created resource in storage.
         */
        public function store(Request $request, string $id)
        {
            try {
                NewPaiementPerso::create([
                    'montantPerso'=> $request->input('montantPerso'),
                    'paiement_perso_id'=> $id,
                ]);
                return response()->json([
                    'message'=>'true'
                ]);
            } catch (\Throwable $e) {
                return response()->json([
                    'message'=>$e
                ]);
            }
        }


        /**
         * Show the form for editing the specified resource.
         */
        public function edit(string $id)
        {
            //
        }

        /**
         * Update the specified resource in storage.
         */
        public function update(Request $request, string $id)
        {
            try {
                $newPaiement=NewPaiementPerso::find($id);

                $newPaiement->update([
                    'montantPerso'=> $request->input('montantPerso'),
                ]);

                return response()->json([
                    'message'=>$id
                ]);

            } catch (\Throwable $e) {
                return response()->json([
                    'message'=>$e
                ]);
            }


        }

        /**
         * Remove the specified resource from storage.
         */
        public function destroy(string $id)
        {
            //
        }
}